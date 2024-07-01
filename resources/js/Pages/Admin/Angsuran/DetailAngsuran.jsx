import React, { useEffect, useState } from "react";
import { Head, usePage, Link, useForm, router } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { Dialog } from "primereact/dialog";

const DetailAngsuran = ({ angsuran, auth, storagePath, kontrakAngsuran }) => {
    const userRole = auth.user.role;
    const { flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setShowModal(true);
            setTimeout(() => {
                flash.success = null;
            }, 2500);
        }
    }, [flash.success]);

    const dataAngsuran = [
        {
            label: "No Pembiayaan",
            value: kontrakAngsuran.pembiayaan.id,
        },
        {
            label: "Nama Nasabah",
            value: kontrakAngsuran.pembiayaan.nama_lengkap,
        },
        {
            label: "Jumlah Angsuran",
            value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(angsuran.jumlah_angsuran),
        },
        {
            label: "Angsuran Ke",
            value: angsuran.angsuran_ke,
        },
        {
            label: "Tanggal Pembayaran",
            value: new Date(angsuran.tanggal_bayar).toLocaleDateString(
                "id-ID",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            ),
        },
        {
            label: "Metode Pembayaran",
            value: angsuran.metode_pembayaran,
        },
        {
            label: "Bukti Pembayaran",
            value: (
                <img
                    src={storagePath}
                    alt="Bukti Pembayaran"
                    className="tail-w-40 tail-h-40"
                />
            ),
        },
        {
            label: "Status",
            value: <StatusBadge status={angsuran.status} />,
        },
        angsuran.status === "pending" && {
            label: "Konfirmasi",
            value: (
                <div className="tail-flex tail-gap-2">
                    <Button
                        label="Terima"
                        severity="success"
                        onClick={() => {
                            router.put(route("angsuran.update", angsuran.id), {
                                status: "paid",
                            });
                        }}
                    />
                    <Button
                        label="Tolak"
                        severity="danger"
                        onClick={() => {
                            router.put(route("angsuran.update", angsuran.id), {
                                status: "rejected",
                            });
                        }}
                    />
                </div>
            ),
        },
    ];

    const routeParameterAdminAngsuran = angsuran.id;
    return (
        <Layout
            user={userRole}
            routeParameterAdminAngsuran={routeParameterAdminAngsuran}
        >
            <Head title="Detail Angsuran" />
            <div className="card p-fluid">
                <h3>Detail Angsuran</h3>
                <div className="tail-mb-4">
                    <table className="tail-min-w-full tail-bg-white tail-border-2 tail-border-gray-200">
                        <tbody>
                            {dataAngsuran.map((data, index) => (
                                <tr
                                    className="tail-border-2 tail-border-gray-200 tail-text-center"
                                    key={index}
                                >
                                    <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                        {data.label}
                                    </td>
                                    <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left tail-line-clamp-1 tail-overflow-auto">
                                        {data.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog
                visible={showModal}
                style={{ width: "450px" }}
                header="Success"
                modal
                onHide={() => setShowModal(false)}
            >
                <h3>{flash.success}</h3>
                <div className="flex gap-2">
                    <Button
                        label="Ke Daftar Angsuran"
                        onClick={() => {
                            setShowModal(false);
                            router.visit("/angsuran");
                        }}
                        className="p-button-info"
                    />
                    <Button
                        label="Tutup"
                        onClick={() => setShowModal(false)}
                        className="p-button-secondary"
                    />
                </div>
            </Dialog>
        </Layout>
    );
};

export default DetailAngsuran;
