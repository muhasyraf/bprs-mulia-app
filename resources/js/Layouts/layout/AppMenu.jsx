import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { Link } from "@inertiajs/react";

const AppMenu = ({ routeParameter }) => {
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
                // {
                //     label: "Button",
                //     icon: "pi pi-fw pi-id-card",
                //     to: route("button"),
                // },
                {
                    label: "Pembiayaan",
                    icon: "pi pi-fw pi-credit-card",
                    to: route("pembiayaan.create"),
                },
                {
                    label: "Daftar Pengajuan",
                    icon: "pi pi-fw pi-list",
                    to: route("pembiayaan.index"),
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem
                            item={item}
                            routeParameter={routeParameter}
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
