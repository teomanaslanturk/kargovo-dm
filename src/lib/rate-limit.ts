/**
 * Basit, bellek içi (in-memory) hız sınırlayıcı (rate limiter).
 *
 * Tek sunucu örneği için yeterlidir. Birden fazla sunucu/instance ile
 * (örn. yatay ölçekleme) çalışacaksanız bunun yerine Redis tabanlı bir
 * çözüm (örn. Upstash Ratelimit) kullanmanız önerilir.
 *
 * Amaç: AI servis çağrıları ve webhook uçları gibi maliyetli/istismara
 * açık işlemleri belirli bir anahtar (kullanıcı, IP vb.) başına sınırlamak.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * `key` için `limit` sayıda isteğe `windowMs` milisaniyelik pencerede izin verir.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Periyodik olarak süresi dolmuş kovaları temizler (bellek sızıntısını önler). */
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}, 5 * 60_000).unref?.();
