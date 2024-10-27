## Streamify

A mock dashboard for a music streaming app

Here is a 5-minute video walkthrough of the UI - [Loom](https://www.loom.com/share/883eb381614946b6852263f14ce2ddf5?sid=5e02942c-16cc-471f-b69b-226730c17cd0)

You can also access it live on Netlify: [ankit-streamify.netlify.app](https://ankit-streamify.netlify.app)

To run this locally, follow these steps:

1. Clone or download the repository.
2. In the root directory, run the following commands:
   ```
   npm install
   npm run dev
   ```

##### Thought Process

To design the dashboard, my goal was to display as much data as possible while maintaining a clean, minimalist interface. I used subtle colors to draw users' attention to key areas. The font choice is Inter, a clean, professional typeface that fits well with dashboard applications.

For the charts, I aimed for a sleek look with minimal grid lines and legends, except for the pie chart, which includes legends due to the number of items. Each chart has custom tooltips to provide additional information. The table is intentionally dense to handle the potential for many rows, and it includes search, filtering, and column sorting functionality. CSS was written with responsiveness in mind, accommodating all screen sizes.

##### Additional Features

1. **Stat Card Reordering**: Users can reorder the stats cards, though this change is not persisted. Ideally, the updated order should be stored in the backend.
2. **Zoom Functionality**: The user growth line chart allows zooming in on specific sections by dragging, making it easier to view data in smaller segments.
3. **Detailed Tooltips**: The top-streamed songs bar chart includes tooltips showing song details.
4. **Loader and Skeleton Screens**: A first-paint logo loader and skeleton screens were added for a smoother loading experience.

##### Trade-Offs and Future Improvements

1. **Mock Data**: The data is hardcoded, allowing for quick setup. It was partially generated using ChatGPT.
2. **State Management**: Given the limited need for complex state management, I used React Context to handle the pie chart selection filter.
3. **Code Splitting**: The code is split by lazily loading the Dashboard route. In the future, more granular code splitting could be implemented based on each section of the dashboard.
4. **Persistent Reordering**: The reordered stat cards could be stored in local storage for persistence.
5. **External Links**: The top-streamed songs tooltips could link to Apple Music or Spotify for added interactivity.
6. **Testing**: Additional tests can be implemented for further coverage.
