import { SpotProductCard } from "@/components/spot-product-card";
import { spotProducts } from "@/data/shop";

export function SpotProducts() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {spotProducts.map((product) => (
        <SpotProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
