import React, { useEffect, useState } from "react";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";
import StatusBadge from "@/Components/Shared/StatusBadge";

const DaftarPengajuan = ({ pembiayaan }) => {
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
                        {sortedPembiayaan.map((pengajuan, index) => (
                            <tr
                                className="tail-border-2 tail-border-gray-200 tail-text-center"
                                key={index}
                            >
                                <td className="tail-py-3 tail-px-4">
                                    {pengajuan.id}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    {pengajuan.nama_lengkap}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    {/* convert to rupiah format */}
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(pengajuan.jumlah_pengajuan)}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    {new Date(pengajuan.created_at)
                                        .toString()
                                        .slice(0, 15)}
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    <StatusBadge status={pengajuan.status} />
                                </td>
                                <td className="tail-py-3 tail-px-4">
                                    <Link
                                        href={route("pembiayaan.show", {
                                            pembiayaan: pengajuan.id,
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
