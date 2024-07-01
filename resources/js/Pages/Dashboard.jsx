import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "@/Layouts/layout/context/layoutcontext";
import Layout from "@/Layouts/layout/layout.jsx";
import { Head } from "@inertiajs/react";
import StatusBadge from "@/Components/Shared/StatusBadge";

const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
        },
        {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
        },
    ],
};

const Dashboard = ({ pembiayaans, kontrakAngsurans, auth }) => {
    const user = auth.user;
    const [lineOptions, setLineOptions] = useState({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        if (layoutConfig.colorScheme === "light") {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    return (
        <Layout user={user.role}>
            <Head title="Dashboard" />
            <div className="grid">
                <div className="col-12 xl:col-6">
                    <div className="card">
                        <h5>Ringkasan Pembiayaan</h5>
                        <div className="tail-grid md:tail-grid-cols-2 tail-gap-2">
                            {pembiayaans &&
                                pembiayaans.map((pembiayaan, index) => (
                                    <table
                                        className="tail-bg-white tail-border-2 tail-border-gray-200 tail-rounded-lg tail-text-sm"
                                        key={index}
                                    >
                                        <tbody>
                                            <tr className="tail-border-2 tail-border-gray-200">
                                                <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                                    Tanggal Diajukan
                                                </td>
                                                <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left">
                                                    {new Date(
                                                        pembiayaan.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="tail-border-2 tail-border-gray-200">
                                                <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                                    Total Pembiayaan
                                                </td>
                                                <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left">
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        }
                                                    ).format(
                                                        pembiayaan.jumlah_pengajuan
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="tail-border-2 tail-border-gray-200">
                                                <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                                    Status
                                                </td>
                                                <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left">
                                                    <StatusBadge
                                                        status={
                                                            pembiayaan.status
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            {pembiayaan.kontrakAngsuran && (
                                                <tr className="tail-border-2 tail-border-gray-200">
                                                    <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                                        Tanggal Survey
                                                    </td>
                                                    <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left">
                                                        {new Date(
                                                            pembiayaan.kontrak_angsuran.tanggal_survei
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="col-12 xl:col-6">
                    <div className="card">
                        <h5>Notifikasi</h5>
                        {pembiayaans.map((pembiayaan, index) =>
                            pembiayaan.status === "approved" ||
                            pembiayaan.status === "rejected" ? (
                                <div
                                    className={`tail-flex tail-gap-1 tail-items-center ${
                                        pembiayaan.status === "approved"
                                            ? "tail-text-green-600"
                                            : "tail-text-red-600"
                                    }`}
                                    key={index}
                                >
                                    <i className="pi pi-fw pi-exclamation-circle"></i>
                                    <p className={`tail-font-medium`}>
                                        {pembiayaan.status === "approved"
                                            ? `Pengajuan pembiayaan nomor ${pembiayaan.id} milik anda telah disetujui`
                                            : `Pengajuan pembiayaan nomor ${pembiayaan.id} milik anda ditolak`}
                                    </p>
                                </div>
                            ) : null
                        )}
                        {kontrakAngsurans &&
                            kontrakAngsurans.map((kontrakAngsuran, index) =>
                                kontrakAngsuran.angsuran.map((angsuran) =>
                                    angsuran.status === "pending" ? (
                                        <div
                                            className="tail-flex tail-gap-1 tail-items-center tail-text-yellow-600"
                                            key={index}
                                        >
                                            <i className="pi pi-fw pi-exclamation-circle"></i>
                                            <p className="tail-font-medium">
                                                Pembayaran angsuran ke{" "}
                                                {angsuran.angsuran_ke}{" "}
                                                pembiayaan nomor{" "}
                                                {kontrakAngsuran.pembiayaan.id}{" "}
                                                belum dikonfirmasi
                                            </p>
                                        </div>
                                    ) : angsuran.status === "paid" ? (
                                        <div
                                            className="tail-flex tail-gap-1 tail-items-center tail-text-green-600"
                                            key={index}
                                        >
                                            <i className="pi pi-fw pi-check-circle"></i>
                                            <p className="tail-font-medium">
                                                Pembayaran angsuran ke{" "}
                                                {angsuran.angsuran_ke} pada
                                                kontrak angsuran nomor{" "}
                                                {kontrakAngsuran.id} telah
                                                dikonfirmasi
                                            </p>
                                        </div>
                                    ) : angsuran.status === "rejected" ? (
                                        <div
                                            className="tail-flex tail-gap-1 tail-items-center tail-text-red-600"
                                            key={index}
                                        >
                                            <i className="pi pi-fw pi-exclamation-circle"></i>
                                            <p className="tail-font-medium">
                                                Pembayaran angsuran ke{" "}
                                                {angsuran.angsuran_ke} pada
                                                kontrak angsuran nomor{" "}
                                                {kontrakAngsuran.id} ditolak
                                            </p>
                                        </div>
                                    ) : kontrakAngsuran.tanggal_jatuh_tempo <
                                      new Date() ? (
                                        <div
                                            className="tail-flex tail-gap-1 tail-items-center tail-text-red-600"
                                            key={index}
                                        >
                                            <i className="pi pi-fw pi-exclamation-circle"></i>
                                            <p className="tail-font-medium">
                                                Pembayaran angsuran pembiayaan
                                                nomor{" "}
                                                {kontrakAngsuran.pembiayaan_id}{" "}
                                                telah melewati tanggal jatuh
                                                tempo
                                            </p>
                                        </div>
                                    ) : null
                                )
                            )}
                    </div>
                </div>
                <div className="col-12 xl:col-6">
                    <div className="card">
                        <h5>Aktivitas Terbaru</h5>
                        <table className="tail-bg-white tail-border-2 tail-border-gray-200 tail-rounded-lg tail-text-md">
                            <tbody>
                                {pembiayaans.length > 0 && (
                                    <tr className="tail-border-2 tail-border-gray-200">
                                        <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                            Pengajuan Terbaru
                                        </td>
                                        <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left">
                                            {/* get latest pembiayaan date data*/}
                                            {new Date(
                                                pembiayaans[
                                                    pembiayaans.length - 1
                                                ].created_at
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                    </tr>
                                )}
                                {kontrakAngsurans.length > 0 && (
                                    <tr className="tail-border-2 tail-border-gray-200">
                                        <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                            Jatuh Tempo Terdekat
                                        </td>
                                        <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left">
                                            {new Date(
                                                kontrakAngsurans
                                                    .map(
                                                        (kontrakAngsuran) =>
                                                            kontrakAngsuran.tanggal_jatuh_tempo
                                                    )
                                                    .sort(
                                                        (a, b) =>
                                                            new Date(a) -
                                                            new Date(b)
                                                    )[0]
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
