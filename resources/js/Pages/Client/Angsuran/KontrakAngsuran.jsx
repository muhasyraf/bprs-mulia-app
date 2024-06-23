import React from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { Head } from "@inertiajs/react";

const KontrakAngsuran = ({ userId, kontrakAngsurans }) => {
    const kontrakAngsuranData = kontrakAngsurans.map((data) => {
        return [
            {
                label: "No Pembiayaan",
                value: data.pembiayaan.id,
            },
            {
                label: "Total Pembiayaan",
                value: new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.pembiayaan.jumlah_pengajuan),
            },
            {
                label: "Sisa Pembayaran",
                value: null,
            },
            {
                label: "Angsuran Bulanan",
                value: new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.angsuran_pokok),
            },
            {
                label: "Denda",
                value: null,
            },
            {
                label: "Tanggal Jatuh Tempo",
                value: new Date(data.tanggal_jatuh_tempo).toLocaleDateString(
                    "id-ID",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }
                ),
            },
            {
                label: "Nisbah/Bagi Hasil Nasabah",
                value: `${data.nisbah_nasabah}%`,
            },
            {
                label: "Nisbah/Bagi Hasil Bank",
                value: `${data.nisbah_bank}%`,
            },
        ];
    });

    return (
        <Layout>
            <Head title="Informasi Angsuran" />
            <div className="card p-fluid tail-overflow-auto tail-h-screen">
                <h3 className="text-center p-2">Informasi Angsuran</h3>
                <div className="p-2 tail-grid md:tail-grid-cols-2 lg:tail-grid-cols-3 tail-gap-4">
                    {kontrakAngsuranData.map((data, index) => (
                        <table
                            className="tail-bg-white tail-border-2 tail-border-gray-200 tail-mx-auto"
                            key={index}
                        >
                            <tbody>
                                {data.map((item) => (
                                    <tr className="tail-border-2 tail-border-gray-200 tail-text-center">
                                        <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                            {item.label}
                                        </td>
                                        <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left tail-line-clamp-1 tail-overflow-auto">
                                            {item.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default KontrakAngsuran;
