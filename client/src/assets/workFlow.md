![AdsTrees](../../public/Favicon32.ico)

## Title:
Engaging with Eco-Focused Advertisement Platform

---

## User Story

>As a user interested in environmental sustainability,
>*I WANT* to be able to watch premium ads on the AdsTrees platform,
>*SO THAT* I can contribute to tree planting initiatives and support eco-friendly advertising.

---

## Acceptance Criteria

### Account Management and History (Ehsan)

### 1. Account Creation and Login
- **Given** a visitor on the AdsTrees platform,
- **When I** attempt to register for an account,
- **Then I** should be able to create an account using my email and password.

### 2. Successful Login
- **Given** I am a registered user,
- **When I** enter my login credentials,
- **Then I** should be able to access my user dashboard.

### 3. History Tracking
- **Given** I am a logged-in user,
- **When I** view ads,
- **Then I** should see my ad-watching history updated in real-time on my dashboard.

### Profile Customization (Marko)

### 4. Ads Preference Setting
- **Given** I am on my profile settings page,
- **When I** set my ad preferences,
- **Then I** should receive personalized ads based on these preferences.

### Dashboard Functionality (Jide)

### 5. Viewer Interaction and Tree Planting (Later)
- **Given** I am watching ads,
- **When I** complete an ad view,
- **Then I** should see an update on my dashboard reflecting the contribution to tree planting.

### 6. Displaying Statistics
- **Given** I am on my dashboard,
- **When I** look at the environmental impact section,
- **Then I** should see statistics related to the number of trees planted and carbon footprint offset.

### 7. Incentive Rewards
- **Given** I have reached a certain milestone in ad views,
- **When I** check my rewards section,
- **Then I** should see the incentives I have earned.

### 8. Progress Tracking
- **Given** I am on my dashboard,
- **When I** view my contribution history,
- **Then I** should see a detailed report of my individual impact, including the number of trees planted.

### Donation Stripe Integration

### 9. Donation Selection
- **Given** I am a donator,
- **When I** choose an amount to donate,
- **Then I** should be able to select a donation amount using Stripe for payment processing.

### 10. Successful Payment Processing
- **Given** I am completing a payment,
- **When I** enter my payment details on Stripe,
- **Then I** should receive confirmation of successful payment and subscription activation.

### PWA Compliance (Last to approach)

### 11. Service Worker Functionality
- **Given** I am using the AdsTrees app,
- **When I** use the app in offline mode,
- **Then I** should be able to access basic functionalities and previously loaded data.

### 12. Installable Web App
- **Given** I am visiting the AdsTrees platform on a compatible browser,
- **When I** choose to install the app,
- **Then I** should be able to add it to my home screen and use it like a native app.

### Security and Authentication (Yega)

### 13. Secure Authentication with JWT
- **Given** I am logging in,
- **When I** submit my credentials,
- **Then I** should be authenticated securely using JWT.

### 14. Password Encryption
- **Given** I am registering or changing my password,
- **When I** submit my new password,
- **Then I** should have it securely encrypted using bcrypt.

### Deployment and Monitoring

### 15. Application Availability Post-Deployment
- **Given** the application is deployed on Render,
- **When I** access the AdsTrees URL,
- **Then I** should be able to reach and use the application without any downtime.

### 16. Database Connectivity
- **Given** the application is using MongoDB Atlas,
- **When I** perform any data-related operation,
- **Then I** should experience smooth and secure data transactions.

---

## Algorithm:

### User Registration and Login
1. User accesses the AdsTrees platform.
2. User registers or logs in using their credentials.
3. System authenticates the user and directs them to the dashboard.

### Profile Customization and Ad Preferences
1. User sets their ad preferences in their profile.
2. System stores these preferences for personalized ad experiences.

### Ad Viewing and Tree Planting Contribution
1. User selects and views ads based on their preferences.
2. For each ad viewed, the system calculates the contribution towards tree planting.
3. System updates the user's dashboard with the number of trees planted due to their engagement.

### Advertiser Subscription and Ad Placement
1. Advertisers log into their accounts.
2. They choose a subscription plan and make payments via Stripe.
3. Advertisers upload their ads to the platform.
4. System places these ads in premium spaces and tracks their environmental contributions.

### Dashboard Functionality for Users and Advertisers
1. Users and advertisers access their dashboards.
2. Dashboards display statistics, environmental impact, and other relevant information.
3. Users receive incentives based on their engagement.

### Feedback and Performance Monitoring
1. System collects user and advertiser feedback.
2. Continuous monitoring of app performance and user engagement.
3. Implement improvements based on feedback and monitoring insights.

### Stretch Goals Implementation
1. Introduce interactive ad features to increase engagement.
2. Implement social sharing capabilities.
3. Establish corporate partnerships for broader environmental impact.
