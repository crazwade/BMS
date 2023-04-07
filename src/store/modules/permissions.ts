import { defineStore } from "pinia";

interface RouteData {
  id: string;
  title: string;
  icon: string;
  name: string;
}

const usePermissionStore = defineStore({
  id: "permissions",
  state: (): {
    permission: string[];
    flatRoute: string[];
    route: RouteData[];
  } => ({
    permission: [],
    flatRoute: [],
    route: [],
  }),
  actions: {
    // 初始化權限
    async INIT_PERMISSION(): Promise<boolean> {
      try {
        // TODO API 取得權限
        const permissionResp = {
          success: true,
          data: {
            permissions: ["READ/me", "POST/login", "POST/logout"],
          },
        };

        if (!permissionResp.success) {
          return false;
        }

        this.SET_PERMISSION_DATE(permissionResp.data.permissions);

        // TODO API 取得路由 Sidebar
        const routeResp = {
          success: true,
          data: {
            route: [
              {
                id: "0",
                title: "首頁",
                icon: "HomeFilled",
                name: "HomePage",
              },
              {
                id: "1",
                title: "成員管理區",
                icon: "UserFilled",
                name: "MemberManagement",
              },
              {
                id: "2",
                title: "出席紀錄區",
                icon: "List",
                name: "AttendanceRecords",
              },
              {
                id: "3",
                title: "操作紀錄區",
                icon: "EditPen",
                name: "OperationRecords",
              },
              {
                id: "4",
                title: "財務紀錄區",
                icon: "Tickets",
                name: "FinancialRecords",
              },
              {
                id: "5",
                title: "社費收取區",
                icon: "Money",
                name: "FeeCollection",
              },
              {
                id: "6",
                title: "活動紀錄區",
                icon: "Basketball",
                name: "EventRecords",
              },
              {
                id: "7",
                title: "意見回饋區",
                icon: "ChatLineSquare",
                name: "FeedbackRecords",
              },
            ],
          },
        };

        if (!routeResp.success) {
          return false;
        }

        const routeData: RouteData[] = routeResp.data.route.map((data) => ({
          id: data.id,
          title: data.title,
          icon: data.icon,
          name: data.name,
        }));

        this.SET_ROUTE_DATE(routeData);
        this.SET_ROUTE_FLAT(routeData);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    // 設定權限資訊
    SET_PERMISSION_DATE(data: string[]) {
      this.permission = [...data];
    },
    // 設定路由資訊
    SET_ROUTE_DATE(data: RouteData[]) {
      this.route = [...data];
    },
    SET_ROUTE_FLAT(data: RouteData[]) {
      this.flatRoute = data.map((item) => item.name);
    },
  },
});

export default usePermissionStore;
