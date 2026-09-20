# OpenRemoteHub

**Nền tảng kiếm tiền online minh bạch và an toàn — mã nguồn mở**

OpenRemoteHub giúp người dùng quản lý công việc online lúc rảnh: kết nối tài khoản qua OAuth, lên lịch nội dung, theo dõi chiến dịch, quản lý cơ hội affiliate/freelance và xem báo cáo. Dự án **không** hứa hẹn thu nhập, **không** bán tương tác ảo, **không** thu thập mật khẩu và **không** tự động spam.

## Kiến trúc

```
[Web: Next.js]
    |
[API: NestJS]  ─────  [PostgreSQL]
    |
    +── [OAuth Connector Layer]  (Google, Meta, Instagram, TikTok, GitHub)
    +── [Queue: Redis + Worker]
    +── [Object Storage]
    +── [Audit Log]
```

## Cấu trúc monorepo

```
openremotehub/
  apps/
    web/        # Next.js 14 dashboard
    api/        # NestJS REST API + OAuth callbacks
    worker/     # BullMQ queue jobs & webhooks
  packages/
    connectors/ # google, meta, instagram, tiktok
    auth/       # PKCE, state, session helpers
    crypto/     # Envelope encryption
    shared/     # Types, error codes
    policy/     # Consent & retention rules
  infra/
    docker/
    terraform/
  docs/
    threat-model.md
    privacy-data-map.md
    provider-review-checklist.md
```

## Bắt đầu nhanh

```bash
# 1. Clone
git clone https://github.com/your-org/openremotehub.git
cd openremotehub

# 2. Copy env
cp .env.example .env
# Điền các giá trị OAuth credentials vào .env

# 3. Chạy với Docker
docker compose up -d

# 4. Migrate database
pnpm --filter api db:migrate

# 5. Mở http://localhost:3000
```

## MVP Roadmap

| Mốc | Phạm vi | Tiêu chí hoàn thành |
|-----|---------|--------------------|
| M0 – Foundation | Monorepo, Docker, Postgres, auth nội bộ | CI xanh, migration, secret management |
| M1 – Identity | Google Sign-In và session | OAuth callback có state/PKCE, revoke hoạt động |
| M2 – Connectors | Facebook, Instagram professional, TikTok Login Kit | Consent, scope manifest, error mapping |
| M3 – Workspace | Content calendar, asset upload, approval | Không publish nếu chưa approve |
| M4 – Publishing | Instagram/TikTok khi app đủ review | Queue, idempotency, retry, audit log |
| M5 – Monetization | Free/Pro/Team, billing webhook | Không để billing webhook tự sửa plan |
| M6 – Hardening | Threat model, backup restore, pentest | Incident runbook, deletion test |

## Giấy phép

Licensed under **AGPLv3** — xem [LICENSE](./LICENSE).

## Disclaimer

Dự án chỉ cung cấp công cụ. Người dùng tự chịu trách nhiệm về nội dung, quyền sử dụng media, disclosure affiliate, thuế, luật nội địa và việc tuân thủ Terms of Service của từng nền tảng. Không có bất kỳ mức thu nhập nào được đảm bảo.
