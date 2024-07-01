import AppMenu from "./AppMenu";

const AppSidebar = ({
    routeParameterPembiayaan,
    routeParameterAngsuran,
    routeParameterAdminAngsuran,
    role,
}) => {
    return (
        <AppMenu
            routeParameterPembiayaan={routeParameterPembiayaan}
            routeParameterAngsuran={routeParameterAngsuran}
            routeParameterAdminAngsuran={routeParameterAdminAngsuran}
            role={role}
        />
    );
};

export default AppSidebar;
