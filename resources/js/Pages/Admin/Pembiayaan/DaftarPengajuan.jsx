import React, { useEffect, useState } from "react";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";

const DaftarPengajuan = ({ auth, pembiayaan }) => {
    const statusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <div className="tail-bg-yellow-200 tail-text-yellow-800 tail-rounded-xl tail-px-1 tail-py-1 tail-text-center tail-text-sm">
                        Pending
                    </div>
                );
            case "approved":
                return (
                    <div className="tail-bg-green-200 tail-text-green-800 tail-rounded-xl tail-px-1 tail-py-1 tail-text-center tail-text-sm">
                        Approved
                    </div>
                );
            case "rejected":
                return (
                    <div className="tail-bg-red-200 tail-text-red-800 tail-rounded-xl tail-px-1 tail-py-1 tail-text-center tail-text-sm">
                        Rejected
                    </div>
                );
            default:
                return (
                    <div className="tail-bg-gray-200 tail-text-gray-800 tail-rounded-xl tail-px-1 tail-py-1 tail-text-center tail-text-sm">
                        Unknown
                    </div>
                );
        }
    };

    const sortedPembiayaan = pembiayaan.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
    });
    return (
        <Layout>
            <Head title="Daftar Pengajuan" />
            <div className="card p-fluid tail-overflow-auto tail-h-screen">
                <h3>Daftar Pengajuan</h3>
                <table className="tail-min-w-full tail-bg-white tail-border-2 tail-border-gray-200">
                    <thead className="tail-sticky tail-top-0 tail-z-50">
                        <tr className="tail-border-2 tail-border-gray-200 tail-bg-gray-200">
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                No
                            </th>
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                Nama Nasabah
                            </th>
                            <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                Jumlah Pengajuan
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
                        {sortedPembiayaan.map((item) => (
                            <tr
                                className="tail-border-2 tail-border-gray-200 tail-text-center"
                                key={item.id}
                            >
                                <td className="tail-py-3 tail-px-4">
                                    {item.id}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    {item.nama_lengkap}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    {/* convert to rupiah format */}
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(item.jumlah_pengajuan)}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    {Date(item.created_at)
                                        .toString()
                                        .slice(0, 15)}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    {statusBadge(item.status)}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    <Link
                                        href={route("pembiayaan.show", {
                                            pembiayaan: item,
                                        })}
                                    >
                                        <Button
                                            label="Lihat"
                                            severity="info"
                                            text
                                        />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default DaftarPengajuan;
