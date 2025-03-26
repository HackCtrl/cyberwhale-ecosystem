
# Deployment Guide

## Overview

This document provides comprehensive information about the deployment process for the CyberWhale platform, including environment configuration, build processes, infrastructure requirements, and monitoring strategies.

## Deployment Environments

### Development Environment
- **Purpose**: Active development and testing of new features
- **URL**: https://dev.cyberwhale.app
- **Update Frequency**: Continuous deployment from the `develop` branch
- **Access**: Internal team only, protected by authentication

### Staging Environment
- **Purpose**: Pre-production testing and quality assurance
- **URL**: https://staging.cyberwhale.app
- **Update Frequency**: Daily deployments from the `staging` branch
- **Access**: Internal team and select beta testers

### Production Environment
- **Purpose**: Live environment accessed by end users
- **URL**: https://cyberwhale.app
- **Update Frequency**: Scheduled releases, typically bi-weekly
- **Access**: Public access with user authentication

## Infrastructure Architecture

### Frontend Hosting
- **Platform**: Lovable.app
- **CDN**: Integrated with Lovable for static asset caching
- **Scaling**: Automatic scaling based on traffic patterns
- **Edge Locations**: Global distribution for low-latency access

### Backend Services
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth service
- **File Storage**: Supabase Storage
- **Functions**: Supabase Edge Functions (Deno runtime)

### Network Configuration
- **Domain Management**: Managed through Cloudflare
- **SSL/TLS**: Let's Encrypt certificates, auto-renewed
- **DNS**: Cloudflare DNS with DNSSEC enabled
- **CDN**: Cloudflare for additional caching and DDoS protection

## Build and Deployment Process

### CI/CD Pipeline
1. **Code Commit**: Developer pushes code to GitHub repository
2. **Automated Tests**: CI runs lint, unit, and integration tests
3. **Build Process**: Application built with optimizations for production
4. **Artifact Generation**: Deployment artifacts created and versioned
5. **Deployment**: Artifacts deployed to the appropriate environment
6. **Smoke Tests**: Basic functionality verified post-deployment
7. **Monitoring**: Performance and error metrics collected

### Build Configuration

#### Development Build
```bash
npm run build:dev
```
- Source maps included
- Minimal optimizations
- Environment variables set for development APIs

#### Production Build
```bash
npm run build:prod
```
- Full optimization (minification, tree-shaking)
- No source maps
- Cache busting for static assets
- Environment variables set for production APIs

### Deployment Artifacts
- Compiled JavaScript bundles
- Optimized CSS
- Static assets (images, fonts, etc.)
- Deployment configuration files
- Database migration scripts

## Environment Configuration

### Environment Variables

#### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://abcdefghijklm.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX...` |
| `NODE_ENV` | Environment name | `production` |

#### Optional Variables
| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_TIMEOUT` | API request timeout (ms) | `30000` | `60000` |
| `VITE_FEATURE_FLAGS` | Enabled feature flags | `{}` | `{"new_ui":true}` |
| `VITE_LOG_LEVEL` | Application logging level | `info` | `debug` |

### Feature Flags
Feature flags can be configured to enable/disable specific features:
```json
{
  "new_ui": true,
  "advanced_challenges": false,
  "team_features": true
}
```

## Database Management

### Migration Strategy
- Migrations are version-controlled in the repository
- Executed automatically during deployment
- Rollback procedures in place for failed migrations

### Backup Policy
- Full database backups: Daily
- Incremental backups: Hourly
- Retention period: 30 days
- Backup verification: Weekly restore tests

## Security Considerations

### Authentication
- JWT-based authentication with short-lived tokens
- Refresh token rotation for persistent sessions
- MFA support for administrative accounts

### Data Protection
- Data encryption at rest and in transit
- PII handled according to GDPR requirements
- Regular security audits and penetration testing

### Compliance
- SOC 2 compliance measures
- GDPR-compliant data handling
- Regular security training for all team members

## Monitoring and Alerting

### Application Monitoring
- **Error Tracking**: Sentry for real-time error monitoring
- **Performance Metrics**: Custom performance tracking
- **User Analytics**: Behavior tracking for key user flows

### Infrastructure Monitoring
- **Server Metrics**: CPU, memory, disk usage
- **Database Metrics**: Query performance, connection pool stats
- **Network Metrics**: Latency, throughput, error rates

### Alerting
- **Critical Alerts**: Immediate notification via SMS and email
- **Warning Alerts**: Email notifications with lower priority
- **Scheduled Reports**: Daily summary of system health

## Disaster Recovery

### Recovery Objectives
- **RPO (Recovery Point Objective)**: < 1 hour
- **RTO (Recovery Time Objective)**: < 4 hours

### Recovery Procedures
1. **Service Disruption**: Automatic failover to standby services
2. **Data Corruption**: Restore from latest verified backup
3. **Complete Outage**: Rebuild infrastructure from IaC templates

### Backup Strategy
- Database: Daily full backups, hourly incrementals
- File Storage: Continuous replication to backup storage
- Configuration: Version-controlled infrastructure as code

## Scaling Strategy

### Horizontal Scaling
- Frontend: Add more instances behind load balancer
- API: Increase function concurrency limits
- Database: Read replicas for query-heavy workloads

### Vertical Scaling
- Database: Upgrade to higher-tier database instances
- Functions: Increase memory/CPU allocation as needed

### Load Testing
- Regular performance testing with simulated user load
- Identification of bottlenecks before they impact users
- Capacity planning based on growth projections

## Maintenance Procedures

### Scheduled Maintenance
- **Frequency**: Monthly maintenance window
- **Timing**: Off-peak hours (typically Sundays, 2-4 AM UTC)
- **Notification**: Users notified 7 days in advance

### Hotfixes
- Critical security issues addressed immediately
- Targeted fixes with minimal impact on running systems
- Post-deployment verification of fix effectiveness

### Version Control
- Semantic versioning for all releases
- Detailed changelog maintained for each version
- Previous versions accessible for compliance purposes

## Documentation Updates

This deployment documentation is updated:
- After each major release
- When infrastructure changes are implemented
- When new deployment procedures are established

## Deployment Contacts

In case of deployment issues, contact:
- **Primary**: DevOps Team (devops@cyberwhale.app)
- **Secondary**: CTO (cto@cyberwhale.app)
- **Emergency**: On-call Engineer (+1-555-123-4567)
