.PHONY: build deploy build-deploy dev logs test check

# Build frontend assets and deploy to Cloudflare Workers
build-deploy:
	@echo "Building frontend assets..."
	npx vite build
	@echo "Deploying to Cloudflare Workers..."
	npx wrangler deploy

# Deploy without building (assumes assets are already built)
deploy:
	@echo "Deploying to Cloudflare Workers..."
	npx wrangler deploy

# Start development server
dev:
	npm run dev

# View logs from Cloudflare Workers
tail:
	wrangler tail

# Run tests
test:
	npm test

# Run all checks (format, lint, types)
check:
	npm run check