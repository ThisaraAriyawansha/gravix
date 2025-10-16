import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: 'admin' | 'customer';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          parent_id: string | null;
          is_active: boolean;
          created_at: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          category_id: string;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          size: string;
          color: string;
          color_hex: string;
          price: number;
          discount_price: number | null;
          stock_quantity: number;
          sku: string | null;
          created_at: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_variant_id: string;
          image_url: string;
          is_primary: boolean;
          alt_text: string | null;
          created_at: string;
        };
      };
      cart: {
        Row: {
          id: string;
          user_id: string;
          product_variant_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          total_amount: number;
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          shipping_address: any;
          customer_name: string;
          customer_phone: string | null;
          customer_email: string | null;
          payment_method: 'card' | 'paypal' | 'cod';
          payment_status: 'pending' | 'paid' | 'failed';
          created_at: string;
          updated_at: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_variant_id: string;
          product_name: string;
          size: string;
          color: string;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
      };
    };
  };
};
