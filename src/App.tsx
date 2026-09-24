import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { DashboardPage } from "@/pages/dashboard/DashboardPage"
import { InsightsPage } from "@/pages/insights/InsightsPage"
import { NotificationsPage } from "@/pages/notifications/NotificationsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
