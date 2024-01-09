![AdsTrees](./image/LogoMain/AdsTrees_Logo_128.svg)

# Phase 1

---

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

---

# Phase 2:

## Title:
Enhancing and Optimizing the AdsTrees Platform for Users and Developers

---

## Developer-Centric User Story

> As a developer working on the AdsTrees platform,
> *I WANT* to implement advanced features and fix existing issues,
> *SO THAT* the application offers a seamless, engaging, and user-friendly experience while supporting environmental sustainability.

---

## Phase 2 Acceptance Criteria

### Error Handling and Bug Fixes

#### 1. Robust Error Handling
- **Given** an error occurs anywhere in the application,
- **When I** interact with the application,
- **Then I** should see user-friendly error messages and the app should handle errors gracefully.

#### 2. Profile Page and User Update Fixes
- **Given** a user updates their profile,
- **When I** save changes,
- **Then I** should see the updates reflected correctly without errors.

#### 3. Profile Picture Functionality
- **Given** a user uploads a new profile picture,
- **When I** view the profile,
- **Then I** should see the updated profile picture.

### Dynamic Video Content and User Preferences

#### 4. Dynamic Video Fetching Using YouTube API
- **Given** the application needs fresh content,
- **When I** interact with the video section,
- **Then I** should see new videos dynamically fetched from YouTube.

#### 5. User Preferences and Ads Filtering
- **Given** a user sets specific ad preferences,
- **When I** view ads,
- **Then I** should only see ads that match my preferences.

### UI/UX Enhancements

#### 6. Light and Dark Mode Toggle
- **Given** a user prefers a specific theme,
- **When I** toggle the theme switch,
- **Then I** should see the app's appearance change to light or dark mode.

#### 7. Cart Feature to Payment Page Transformation
- **Given** a user decides to make a donation,
- **When I** proceed to checkout,
- **Then I** should be directed to a redesigned payment page.

#### 8. Custom Donation Checkout Page
- **Given** a user is on the payment page,
- **When I** finalize my donation,
- **Then I** should experience a streamlined and custom checkout process.

#### 9. Video Player and Stats Alignment
- **Given** a user is watching videos,
- **When I** view the dashboard,
- **Then I** should see the video player aligned with real-time stats.

#### 10. Duration Bar for Videos
- **Given** a user is watching a video,
- **When I** view the video player,
- **Then I** should see a duration bar indicating video progress.

#### 11. Responsive Video Frame Styling
- **Given** a user accesses the app on various devices,
- **When I** view videos,
- **Then I** should see a responsive and well-styled video frame.

#### 12. Active Tabs Logic in Header
- **Given** a user navigates through the app,
- **When I** switch between different pages,
- **Then I** should see the active tab highlighted in the header.

#### 13. Terms and Privacy Implementation
- **Given** a user is concerned about privacy,
- **When I** visit the Terms and Privacy section,
- **Then I** should find detailed information regarding the app's policies.

#### 14. Contact Page Message Input Fix
- **Given** a user wants to send a message,
- **When I** type in the message box on the contact page,
- **Then I** should be able to enter text without issues.

#### 15. Restyling Signup Page Inputs
- **Given** a user is registering,
- **When I** enter my details on the signup page,
- **Then I** should see well-styled and responsive input fields.

#### 16. Login Page Motto Update
- **Given** a user visits the login page,
- **When I** read the page's motto,
- **Then I** should find it inspiring and aligned with the app's mission.

---

## Phase 2 Algorithm:

### Error Handling and User Experience
1. Implement global error handling mechanisms.
2. Ensure profile updates are handled correctly and reflect immediately.
3. Add functionality for users to update their profile pictures.

### Dynamic Content and User Preferences
1. Integrate YouTube API to fetch new videos dynamically.
2. Implement user preference settings for personalized ad experiences.

### UI/UX Enhancements
1. Add a toggle switch for light and dark modes.
2. Transform the cart feature into a more comprehensive payment page.
3. Design a custom checkout page for donations.
4. Align the video player with real-time statistics for a cohesive user experience.
5. Implement a duration bar for videos to indicate progress.
6. Ensure the video frame is responsive and aesthetically pleasing.
7. Develop logic for active tabs in the header to improve navigation.
8. Create detailed Terms and Privacy pages.
9. Fix the message input functionality on the contact page.
10. Restyle the input fields on the signup page for better user experience.
11. Update the motto on the login page to reflect the app's mission and values.

### Testing and Deployment
1. Thoroughly test all new features and fixes for functionality and responsiveness.
2. Deploy updates and monitor the application for any issues post-deployment.

By implementing these enhancements and fixes, the AdsTrees platform will offer a more engaging,
