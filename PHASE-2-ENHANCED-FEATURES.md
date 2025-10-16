# Phase 2: Enhanced Features

**Timeline:** 6-8 weeks  
**Goal:** Add advanced features to improve user experience and platform functionality

---

## 📋 Task Checklist

### Week 1-2: Advanced Search & Filtering

#### 1.1 Enhanced Marketplace Features
- [ ] **Task:** Implement advanced filtering UI
  - **Brief:** Add multi-select filters: Property type (checkboxes), Lead type (checkboxes), Price range (dual slider), Bedrooms/Bathrooms (dropdowns), Square footage range. Filters persist on page reload.

- [ ] **Task:** Build saved search functionality
  - **Brief:** Allow users to save their filter combinations with a name. Quick apply saved searches. Create database table for saved_searches (user_id, name, filters_json).

- [ ] **Task:** Add sorting options
  - **Brief:** Sort leads by: Price (low to high, high to low), Date added (newest, oldest), Ending soon (countdown timer). Update URL params for shareable sorted views.

- [ ] **Task:** Implement full-text search
  - **Brief:** Search across: address, city, state, lead description, notes. Use MongoDB text indexes or Elasticsearch for better performance. Highlight search terms in results.

- [ ] **Task:** Create search suggestions/autocomplete
  - **Brief:** As user types in search box, show suggestions for cities, states, property types. Use debounce to limit API calls.

- [ ] **Task:** Add "Recently Viewed" leads tracking
  - **Brief:** Store user's recently viewed leads (client-side or database). Display in sidebar or separate section for easy re-access.

#### 1.2 Map Integration
- [ ] **Task:** Set up Mapbox or Google Maps API
  - **Brief:** Create account, get API key, install SDK (mapbox-gl or @googlemaps/js-api-loader), configure in project.

- [ ] **Task:** Build interactive map view for marketplace
  - **Brief:** Create map component showing all leads as markers. Cluster markers when zoomed out. Different marker colors for lead types.

- [ ] **Task:** Implement map-based filtering
  - **Brief:** Draw boundary tool or search by map area. Only show leads within visible map bounds. Update results as user pans/zooms.

- [ ] **Task:** Add individual lead map view
  - **Brief:** On lead detail page, show property location on map (exact pin or general area based on privacy settings). Street view integration (optional).

- [ ] **Task:** Create map popup cards
  - **Brief:** Click marker on map to show lead card popup with: photo, price, basic info, "View Details" button.

#### 1.3 Favorites/Wishlist System
- [ ] **Task:** Create Favorites database model
  - **Brief:** Schema: user_id, lead_id, added_at. Index on user_id for fast lookups.

- [ ] **Task:** Build "Add to Favorites" functionality
  - **Brief:** Heart icon on lead cards. Toggle favorite on/off. POST/DELETE /api/favorites. Update icon state in real-time.

- [ ] **Task:** Create Favorites page
  - **Brief:** /pages/favorites - display all user's favorited leads. Same card layout as marketplace. "Remove from favorites" option.

- [ ] **Task:** Add favorites count to profile
  - **Brief:** Show total favorited leads in user dashboard/profile. Quick link to favorites page.

---

### Week 3-4: Enhanced CRM Features

#### 2.1 Advanced CRM Functionality
- [ ] **Task:** Implement CRM dashboard analytics
  - **Brief:** Stats cards: Total leads, By status (pie chart), Conversion rate, Average days to close. Use Chart.js or Recharts for visualizations.

- [ ] **Task:** Create CRM filters and sorting
  - **Brief:** Filter by: Status, Priority, Date purchased, Next follow-up date. Sort by: Date, Priority, Status. Combine multiple filters.

- [ ] **Task:** Build priority/urgency system
  - **Brief:** Add priority field (High, Medium, Low) to crm_leads. Color-coded badges. Sort/filter by priority.

- [ ] **Task:** Implement bulk actions in CRM
  - **Brief:** Select multiple leads (checkboxes), bulk update status, bulk delete, bulk export. Confirmation modal before bulk actions.

- [ ] **Task:** Create CRM export functionality
  - **Brief:** Export leads to CSV/Excel with all details. Include filters (export only filtered leads). Download button generates file.

#### 2.2 Follow-up & Reminder System
- [ ] **Task:** Build follow-up scheduler
  - **Brief:** Date-time picker for next follow-up. Save to crm_leads.next_follow_up. Show countdown/time until follow-up.

- [ ] **Task:** Create "Today's Follow-ups" view
  - **Brief:** Dashboard widget showing leads due for follow-up today. Sort by time. Quick action buttons (Call, Email, Reschedule).

- [ ] **Task:** Implement email reminders for follow-ups
  - **Brief:** Daily scheduled job (cron) to check upcoming follow-ups. Send email reminder to user 1 day before and on the day. Include lead details in email.

- [ ] **Task:** Add in-app reminder notifications
  - **Brief:** Show notification badge for overdue follow-ups. Notification panel in header. Mark as done functionality.

- [ ] **Task:** Create follow-up history log
  - **Brief:** Log all follow-up completions and reschedules in crm_activities. Display in activity timeline.

#### 2.3 Enhanced Activity Tracking
- [ ] **Task:** Build structured activity log form
  - **Brief:** Form with: Activity type (dropdown: Call, Email, SMS, Meeting, Site Visit, Note), Date-time, Duration, Outcome (dropdown: Positive, Neutral, Negative, No Answer), Description. Save to crm_activities.

- [ ] **Task:** Implement quick-log buttons
  - **Brief:** Quick action buttons on CRM lead detail: "Log Call", "Log Email", "Add Note". Pre-fill activity type, open modal with rest of form.

- [ ] **Task:** Create activity statistics
  - **Brief:** Show activity stats per lead: Total activities, Last activity date, Activity breakdown by type. Help user track engagement.

- [ ] **Task:** Add activity search and filter
  - **Brief:** On activity timeline, filter by: Activity type, Date range. Search activity descriptions.

#### 2.4 Communication Tools Integration (Optional)
- [ ] **Task:** Add click-to-call functionality
  - **Brief:** Phone numbers become clickable links (tel: protocol). On mobile, opens phone dialer. On desktop, can integrate with VoIP (optional).

- [ ] **Task:** Add click-to-email functionality
  - **Brief:** Email addresses open default email client (mailto: protocol) with pre-filled subject ("Re: Lead at [address]").

- [ ] **Task:** Create SMS sending interface (optional)
  - **Brief:** Integrate Twilio or similar. Button to send SMS directly from CRM lead. Track sent messages in activities.

- [ ] **Task:** Build email template system (optional)
  - **Brief:** Pre-written email templates for common scenarios (first contact, follow-up, offer submitted). Insert lead details dynamically.

---

### Week 5-6: Lead Management Enhancements

#### 3.1 Countdown Timer System
- [ ] **Task:** Implement countdown timer on lead cards
  - **Brief:** Display time remaining (e.g., "2d 5h 30m") on marketplace lead cards. Update in real-time (JavaScript interval). Show "Expired" when time runs out.

- [ ] **Task:** Create countdown timer management (Manager)
  - **Brief:** Manager can set/edit countdown duration when approving lead. Default values (24h, 48h, 7d) or custom. Update countdown_expires_at field.

- [ ] **Task:** Build expired leads handling page (Manager)
  - **Brief:** /pages/manager/expired-leads - list all leads where countdown has expired and not sold. Actions: Reassign to JV, Delete, Re-list with new countdown.

- [ ] **Task:** Implement automated expiration checking
  - **Brief:** Background job (cron) runs every hour. Checks for expired leads, updates status, sends notifications to manager, removes from public marketplace.

- [ ] **Task:** Add urgent/ending soon badge
  - **Brief:** Show "ENDING SOON" badge on leads expiring in < 24 hours. Different color, prominent position. Create urgency.

#### 3.2 Lead Assignment & Fixed Price Mode
- [ ] **Task:** Build user assignment selector
  - **Brief:** When manager approves lead in fixed price mode, dropdown shows all buyers/JV partners. Select user, lead assigned directly to them.

- [ ] **Task:** Create "Assigned Leads" notification system
  - **Brief:** When lead assigned, send email and in-app notification to assigned user. Include lead preview, access link.

- [ ] **Task:** Build "My Assigned Leads" page (Buyer)
  - **Brief:** /pages/assigned-leads - separate from purchased leads. Shows leads assigned to user in fixed price mode. "Accept" or "Decline" options.

- [ ] **Task:** Implement accept/decline assignment flow
  - **Brief:** User can accept (lead auto-purchased, moved to CRM) or decline (returned to manager for reassignment). Update lead status accordingly.

- [ ] **Task:** Create JV partner management (Manager)
  - **Brief:** Special page to manage JV partners list. Add/remove users from JV partner group. Set commission rates (optional).

#### 3.3 Lead Status & Lifecycle
- [ ] **Task:** Add lead status indicators throughout
  - **Brief:** Color-coded badges for lead status (Pending: yellow, Approved: green, Rejected: red, Sold: blue, Expired: gray). Consistent across all pages.

- [ ] **Task:** Create lead history tracking
  - **Brief:** New table: lead_history (lead_id, action, changed_by, old_value, new_value, timestamp). Log all changes: status changes, price updates, assignments.

- [ ] **Task:** Build lead detail change log (Manager)
  - **Brief:** On manager lead detail view, show history tab with all changes. Who did what and when. Audit trail.

- [ ] **Task:** Implement lead reactivation (Manager)
  - **Brief:** Rejected or expired leads can be reactivated. Re-approve, set new price/countdown, make available again.

#### 3.4 Photo Management
- [ ] **Task:** Add photo gallery viewer
  - **Brief:** Click photo to open fullscreen lightbox. Navigation arrows, thumbnails, zoom. Use library like react-image-lightbox or PhotoSwipe.

- [ ] **Task:** Implement photo reordering (Agent)
  - **Brief:** Drag-and-drop to reorder photos before submission. Primary photo shown first. Update photo_order field.

- [ ] **Task:** Add photo captions/labels (Agent)
  - **Brief:** Optional caption field for each photo (e.g., "Front view", "Kitchen", "Backyard"). Display captions in gallery.

- [ ] **Task:** Create photo moderation (Manager)
  - **Brief:** Manager can delete inappropriate photos during review. Replace photos without rejecting entire lead.

---

### Week 7: Analytics & Reporting

#### 4.1 User Analytics Dashboard
- [ ] **Task:** Build Buyer analytics page
  - **Brief:** /pages/analytics - Stats: Total spent, Leads purchased, Conversion rate (purchased to closed), Average lead cost. Charts: Spending over time, Status breakdown.

- [ ] **Task:** Create Agent analytics page
  - **Brief:** /pages/agent/analytics - Stats: Leads submitted, Approval rate, Total earnings, Average lead price. Charts: Submissions over time, Rejection reasons.

- [ ] **Task:** Build Manager analytics dashboard
  - **Brief:** /pages/manager/analytics - Comprehensive stats: Total revenue, Leads sold/pending/rejected, Active users, Popular locations. Multiple charts and graphs.

#### 4.2 Reporting System
- [ ] **Task:** Create revenue reports (Manager)
  - **Brief:** Generate reports: Daily, Weekly, Monthly revenue. Filter by date range. Show breakdown by lead type, location. Export to PDF/CSV.

- [ ] **Task:** Build user activity reports (Manager)
  - **Brief:** Report on user engagement: New registrations, Active buyers, Purchase frequency. Identify top buyers and agents.

- [ ] **Task:** Implement lead performance reports
  - **Brief:** Track which lead types sell fastest, which locations are most popular, average time to sell. Help optimize lead sourcing.

- [ ] **Task:** Create automated weekly reports
  - **Brief:** Scheduled email (every Monday) to manager with: Last week's sales, Revenue, New users, Pending approvals. Auto-generate and send.

---

### Week 8: User Experience & Polish

#### 5.1 Profile & Settings
- [ ] **Task:** Build comprehensive user profile page
  - **Brief:** /pages/profile - Display: Profile photo, Name, Email, Phone, Company, Bio. Edit mode with form validation.

- [ ] **Task:** Implement profile photo upload
  - **Brief:** Upload profile picture, crop/resize, save to storage. Display in header, profile page, lead cards (for agents).

- [ ] **Task:** Create notification preferences page
  - **Brief:** /pages/settings/notifications - Toggle notifications: Email, In-app. Choose notification types: Lead updates, Purchases, Follow-up reminders, System announcements.

- [ ] **Task:** Build password change functionality
  - **Brief:** /pages/settings/security - Form: Current password, New password, Confirm. Validate, hash, update. Send confirmation email.

- [ ] **Task:** Add account deletion option
  - **Brief:** /pages/settings/account - "Delete Account" button. Confirmation modal with warning. Soft delete (mark as deleted) or hard delete based on policy.

#### 5.2 Enhanced Notifications
- [ ] **Task:** Build notification center
  - **Brief:** /pages/notifications - List all notifications (read/unread). Mark as read, mark all as read, delete. Filter by type.

- [ ] **Task:** Implement real-time notifications
  - **Brief:** Use Socket.io or Server-Sent Events. Push notifications instantly when: Lead approved, Purchase made, Credit added, New assignment.

- [ ] **Task:** Add notification sound/toast
  - **Brief:** Optional notification sound on new notification. Toast popup in corner (auto-dismiss after 5s). Don't be annoying.

- [ ] **Task:** Create notification email digest
  - **Brief:** Option for daily/weekly email digest of notifications instead of individual emails. Reduce email fatigue.

#### 5.3 Mobile Optimization
- [ ] **Task:** Optimize all pages for mobile devices
  - **Brief:** Review every page on mobile. Fix layout issues, ensure touch-friendly buttons (min 44px), readable text, proper spacing.

- [ ] **Task:** Create mobile-specific navigation
  - **Brief:** Hamburger menu with slide-out sidebar. Bottom navigation bar for key actions (Home, Marketplace, Cart, CRM, Profile).

- [ ] **Task:** Implement swipe gestures (optional)
  - **Brief:** Swipe left/right on lead cards for quick actions (favorite, add to cart). Swipe to delete in cart. Improve mobile UX.

- [ ] **Task:** Add mobile-optimized map interactions
  - **Brief:** Larger map controls, easier marker selection, responsive popups. Test on actual mobile devices.

#### 5.4 Performance Optimization
- [ ] **Task:** Implement lazy loading for images
  - **Brief:** Load images only when scrolling into view. Reduce initial page load time. Use Intersection Observer API or library.

- [ ] **Task:** Add database query optimization
  - **Brief:** Review slow queries (use profiling). Add indexes on frequently queried fields (email, lead status, user_id, created_at). Use explain plans.

- [ ] **Task:** Implement API response caching
  - **Brief:** Cache frequently accessed, slow-changing data (lead listings, user profiles). Use Redis or in-memory cache. Set appropriate TTL.

- [ ] **Task:** Enable GZIP compression
  - **Brief:** Compress API responses and static assets. Configure Express compression middleware or hosting provider settings.

- [ ] **Task:** Implement pagination for large lists
  - **Brief:** Limit API responses to 20-50 items. Add pagination controls. Use cursor-based pagination for better performance on large datasets.

- [ ] **Task:** Add skeleton loading screens
  - **Brief:** Show skeleton placeholders while data loads. Better perceived performance than spinners. Use react-loading-skeleton or custom CSS.

#### 5.5 Help & Documentation
- [ ] **Task:** Create in-app help/tour system
  - **Brief:** Interactive walkthrough for new users. Highlight key features. Use library like react-joyride or Intro.js. Show once on first login.

- [ ] **Task:** Build FAQ page
  - **Brief:** /pages/faq - Common questions organized by category (Account, Purchasing, Selling Leads, CRM). Searchable. Collapsible sections.

- [ ] **Task:** Add contextual help tooltips
  - **Brief:** Question mark icons next to complex fields/features. Hover/click to show explanation. Don't overwhelm, use sparingly.

- [ ] **Task:** Create video tutorials (optional)
  - **Brief:** Short screencast videos showing: How to buy leads, How to submit leads, How to use CRM. Embed on relevant pages or help center.

---

### Additional Tasks

#### 6.1 Testing & Quality Assurance
- [ ] **Task:** Write tests for new features
  - **Brief:** Unit tests for: New API endpoints, Search/filter logic, Countdown timer logic, Notification system. Maintain 70%+ coverage.

- [ ] **Task:** Perform regression testing
  - **Brief:** Ensure Phase 1 features still work correctly. Test critical paths: Login, Submit lead, Purchase, CRM access. Fix any broken functionality.

- [ ] **Task:** User acceptance testing (UAT)
  - **Brief:** Invite 5-10 beta users to test new features. Collect feedback via survey. Fix critical bugs, prioritize feature requests.

- [ ] **Task:** Load testing
  - **Brief:** Test platform with 100+ concurrent users (use tools like Apache JMeter, k6). Identify bottlenecks, optimize.

#### 6.2 Security Enhancements
- [ ] **Task:** Implement rate limiting on sensitive endpoints
  - **Brief:** Limit login attempts (5 per 15 min), password reset requests, API calls. Prevent brute force attacks and abuse.

- [ ] **Task:** Add input sanitization for all user inputs
  - **Brief:** Sanitize text inputs to prevent XSS attacks. Use libraries like DOMPurify or validator. Escape HTML in displays.

- [ ] **Task:** Enable two-factor authentication (2FA) - Optional
  - **Brief:** Add option for users to enable 2FA. Use TOTP (Google Authenticator). QR code setup, backup codes.

- [ ] **Task:** Implement CSRF protection
  - **Brief:** Add CSRF tokens to all state-changing requests (POST, PUT, DELETE). Use csurf middleware or framework built-in.

#### 6.3 Deployment
- [ ] **Task:** Deploy Phase 2 features to staging
  - **Brief:** Deploy to staging environment. Run full test suite. Fix any deployment issues. Get stakeholder approval.

- [ ] **Task:** Create database migration scripts
  - **Brief:** Scripts to add new tables/fields (saved_searches, lead_history, favorites, crm enhancements). Test on copy of production data.

- [ ] **Task:** Plan zero-downtime deployment
  - **Brief:** Use blue-green deployment or rolling updates. Minimize user disruption. Schedule during low-traffic period if needed.

- [ ] **Task:** Deploy to production
  - **Brief:** Run migrations, deploy backend, deploy frontend. Monitor error logs and performance. Be ready to rollback if critical issues.

- [ ] **Task:** Post-deployment monitoring
  - **Brief:** Watch for 48 hours: Error rates, Response times, User feedback. Fix issues quickly.

- [ ] **Task:** Announce new features
  - **Brief:** Email existing users about new features. Blog post, social media. Create changelog page on website.

---

## ✅ Phase 2 Complete!

**New Features Added:**
- ✅ Advanced search and filtering with saved searches
- ✅ Interactive map integration with map-based search
- ✅ Favorites/wishlist system
- ✅ Enhanced CRM with analytics, follow-up reminders, bulk actions
- ✅ Countdown timer system for marketplace leads
- ✅ Lead assignment and fixed price mode
- ✅ Comprehensive analytics and reporting
- ✅ Improved user profiles and settings
- ✅ Real-time notifications
- ✅ Mobile optimization
- ✅ Performance improvements
- ✅ In-app help and documentation

**Total Tasks:** ~95 tasks

---

**Next Phase:** [PHASE-3-AUTOMATION-SCALING.md](./PHASE-3-AUTOMATION-SCALING.md)
