import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { Link } from "@inertiajs/react";

const AppMenu = ({
    routeParameterPembiayaan,
    routeParameterAngsuran,
    routeParameterAdminAngsuran,
    role,
}) => {
    const { layoutConfig } = useContext(LayoutContext);
    const model = [
        {
            label: "Menu",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: route("dashboard"),
                },
                {
                    label: "Pembiayaan",
                    icon: "pi pi-fw pi-credit-card",
                    to: route("pembiayaan.create"),
                },
                {
                    label: "Angsuran",
                    icon: "pi pi-fw pi-money-bill",
                    to: route("kontrak-angsuran.index"),
                },
            ],
        },
    ];

    const adminModel = [
        {
            label: "Menu",
            items: [
                {
                    label: "Daftar Pengajuan",
                    icon: "pi pi-fw pi-credit-card",
                    to: route("pembiayaan.index"),
                },
                {
                    label: "Daftar Angsuran",
                    icon: "pi pi-fw pi-money-bill",
                    to: route("angsuran.index"),
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {role === "user"
                    ? model.map((item, i) => {
                          return !item?.seperator ? (
                              <AppMenuitem
                                  item={item}
                                  routeParameterPembiayaan={
                                      routeParameterPembiayaan
                                  }
                                  routeParameterAngsuran={
                                      routeParameterAngsuran
                                  }
                                  routeParameterAdminAngsuran={
                                      routeParameterAdminAngsuran
                                  }
                                  root={true}
                                  index={i}
                                  key={item.label}
                              />
                          ) : (
                              <li className="menu-separator"></li>
                          );
                      })
                    : adminModel.map((item, i) => {
                          return !item?.seperator ? (
                              <AppMenuitem
                                  item={item}
                                  routeParameterPembiayaan={
                                      routeParameterPembiayaan
                                  }
                                  routeParameterAngsuran={
                                      routeParameterAngsuran
                                  }
                                  routeParameterAdminAngsuran={
                                      routeParameterAdminAngsuran
                                  }
                                  root={true}
                                  index={i}
                                  key={item.label}
                              />
                          ) : (
                              <li className="menu-separator"></li>
                          );
                      })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
