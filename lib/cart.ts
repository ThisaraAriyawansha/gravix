import { supabase } from './supabase';

export async function getCartItems(userId: string) {
  const { data, error } = await supabase
    .from('cart')
    .select(`
      *,
      variant:product_variants(
        *,
        product:products(name, slug),
        images:product_images(image_url, is_primary, alt_text)
      )
    `)
    .eq('user_id', userId);

  return { data, error };
}

export async function addToCart(userId: string, variantId: string, quantity: number = 1) {
  const { data: existing } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId)
    .eq('product_variant_id', variantId)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single();

    return { data, error };
  } else {
    const { data, error } = await supabase
      .from('cart')
      .insert({ user_id: userId, product_variant_id: variantId, quantity })
      .select()
      .single();

    return { data, error };
  }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  if (quantity <= 0) {
    return await removeFromCart(cartItemId);
  }

  const { data, error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('id', cartItemId)
    .select()
    .single();

  return { data, error };
}

export async function removeFromCart(cartItemId: string) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartItemId);

  return { error };
}

export async function clearCart(userId: string) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId);

  return { error };
}

export async function getCartCount(userId: string) {
  const { data, error } = await supabase
    .from('cart')
    .select('quantity')
    .eq('user_id', userId);

  if (error) return { count: 0, error };

  const count = data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return { count, error: null };
}
