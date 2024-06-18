import React, { useEffect, useState } from "react";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";

const DetailPengajuan = ({ auth, pembiayaan }) => {
    return (
        <Layout>
            <Head title="Detail Pengajuan" />
            <div className="card p-fluid tail-overflow-auto tail-h-screen">
                <h3>Detail Pengajuan</h3>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            key={pembiayaan.id}
                            className="tail-border-2 tail-border-gray-200"
                        >
                            <td className="tail-text-center tail-py-3 tail-px-4 tail-text-sm">
                                {pembiayaan.id}
                            </td>
                            <td className="tail-text-center tail-py-3 tail-px-4 tail-text-sm">
                                {pembiayaan.nama_lengkap}
                            </td>
                            <td className="tail-text-center tail-py-3 tail-px-4 tail-text-sm">
                                {pembiayaan.jumlah_pengajuan}
                            </td>
                            <td className="tail-text-center tail-py-3 tail-px-4 tail-text-sm">
                                {pembiayaan.created_at}
                            </td>
                            <td className="tail-text-center tail-py-3 tail-px-4 tail-text-sm">
                                {pembiayaan.status}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default DetailPengajuan;
