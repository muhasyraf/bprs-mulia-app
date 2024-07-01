import React, { useEffect, useState } from "react";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";
import StatusBadge from "@/Components/Shared/StatusBadge";

const DaftarAngsuran = ({ kontrakAngsuran, auth }) => {
    const userRole = auth.user.role;
    const angsuranData = kontrakAngsuran.map((data) => {
        return data.angsuran.map((angsuran) => {
            return [
                {
                    label: "No Pembiayaan",
                    value: data.pembiayaan.id,
                },
                {
                    label: "Nama Nasabah",
                    value: data.pembiayaan.nama_lengkap,
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
                    label: "Status",
                    value: <StatusBadge status={angsuran.status} />,
                },
                {
                    label: "Aksi",
                    value: (
                        <Link
                            href={route("angsuran.show", {
                                angsuran: angsuran.id,
                            })}
                        >
                            <Button label="Lihat" severity="info" text />
                        </Link>
                    ),
                },
            ];
        });
    });

    const sortedAngsuranData = angsuranData.flat().sort((a, b) => {
        return a[0].value - b[0].value;
    });

    return (
        <Layout user={userRole}>
            <Head title="Daftar Angsuran" />
            <div className="card p-fluid tail-overflow-auto tail-h-screen">
                <h3>Daftar Angsuran</h3>
                <table className="tail-min-w-full tail-bg-white tail-border-2 tail-border-gray-200">
                    <thead className="tail-sticky tail-top-0 tail-z-50">
                        <tr className="tail-border-2 tail-border-gray-200 tail-bg-gray-200">
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                No Pembiayaan
                            </th>
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                Nama Nasabah
                            </th>
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                Jumlah Angsuran
                            </th>
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                Angsuran Ke
                            </th>
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                Tanggal
                            </th>
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                Status
                            </th>
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAngsuranData.map((data, index) => (
                            <tr
                                className="tail-border-2 tail-border-gray-200 tail-text-center"
                                key={index}
                            >
                                {data.map((item, i) => (
                                    <td className="tail-py-3 tail-px-4" key={i}>
                                        {item.value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default DaftarAngsuran;
