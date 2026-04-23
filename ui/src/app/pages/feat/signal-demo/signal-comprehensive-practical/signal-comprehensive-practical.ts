import { ChangeDetectionStrategy, Component, computed, resource, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'MacBook Pro 14"', price: 14999, stock: 5, category: '电脑' },
  { id: 2, name: 'iPhone 16 Pro', price: 8999, stock: 10, category: '手机' },
  { id: 3, name: 'AirPods Pro', price: 1899, stock: 20, category: '配件' },
  { id: 4, name: 'iPad Air', price: 4799, stock: 8, category: '平板' },
  { id: 5, name: 'Apple Watch', price: 2999, stock: 15, category: '穿戴' },
  { id: 6, name: 'Magic Keyboard', price: 799, stock: 30, category: '配件' }
];

@Component({
  selector: 'app-signal-comprehensive-practical',
  imports: [
    PageHeaderComponent,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzWaveModule,
    NzInputModule,
    NzTagModule,
    NzDividerModule,
    NzEmptyModule,
    NzSpinModule,
    NzBadgeModule,
    NzStatisticModule,
    NzListModule,
    NzIconModule
  ],
  templateUrl: './signal-comprehensive-practical.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './signal-comprehensive-practical.less'
})
export class SignalComprehensivePractical {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Signal 综合实战 — 购物车',
    breadcrumb: ['首页', '功能', 'Signal 综合实战'],
    desc: '综合运用 resource()、signal()、computed()、toSignal() 实现一个完整的购物车场景'
  };

  // 商品列表（resource() 加载）
  readonly productsResource = resource({
    loader: () => new Promise<Product[]>(resolve => setTimeout(() => resolve(MOCK_PRODUCTS), 800))
  });

  // 搜索过滤（toSignal + debounce）
  private readonly search$ = new Subject<string>();
  readonly searchText = toSignal(this.search$.pipe(debounceTime(200)), { initialValue: '' });
  readonly filteredProducts = computed(() => {
    const text = this.searchText().toLowerCase();
    const products = this.productsResource.value() ?? [];
    return text ? products.filter(p => p.name.toLowerCase().includes(text) || p.category.includes(text)) : products;
  });

  onSearchInput(e: Event): void {
    this.search$.next((e.target as HTMLInputElement).value);
  }

  // 购物车状态（signal）
  readonly cart = signal<CartItem[]>([]);

  // 派生状态（computed）
  readonly cartCount = computed(() => this.cart().reduce((sum, i) => sum + i.quantity, 0));
  readonly cartTotal = computed(() =>
    this.cart().reduce((sum, item) => {
      const product = (this.productsResource.value() ?? []).find(p => p.id === item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0)
  );
  readonly isEmpty = computed(() => this.cart().length === 0);

  cartItemFor(productId: number): CartItem | undefined {
    return this.cart().find(i => i.productId === productId);
  }

  quantityFor(productId: number): number {
    return this.cartItemFor(productId)?.quantity ?? 0;
  }

  productFor(productId: number): Product | undefined {
    return (this.productsResource.value() ?? []).find(p => p.id === productId);
  }

  addToCart(productId: number): void {
    this.cart.update(items => {
      const existing = items.find(i => i.productId === productId);
      if (existing) {
        return items.map(i => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...items, { productId, quantity: 1 }];
    });
  }

  updateQuantity(productId: number, delta: number): void {
    this.cart.update(items => {
      const item = items.find(i => i.productId === productId);
      if (!item) return items;
      const newQty = item.quantity + delta;
      if (newQty <= 0) return items.filter(i => i.productId !== productId);
      return items.map(i => (i.productId === productId ? { ...i, quantity: newQty } : i));
    });
  }

  removeFromCart(productId: number): void {
    this.cart.update(items => items.filter(i => i.productId !== productId));
  }

  clearCart(): void {
    this.cart.set([]);
  }
}

