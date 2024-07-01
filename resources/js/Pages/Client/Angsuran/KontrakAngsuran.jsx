import React from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { Head, Link } from "@inertiajs/react";
import { Button } from "primereact/button";

const KontrakAngsuran = ({ userId, kontrakAngsurans, auth }) => {
    const userRole = auth.user.role;
    const angsuranData = kontrakAngsurans.map((data) => {
        return data.angsuran.map((angsuran) => {
            return [
                {
                    label: "No Pembiayaan",
                    value: data.pembiayaan.id,
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
                    label: "Jumlah Pembayaran",
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
                    label: "Status",
                    value: <StatusBadge status={angsuran.status} />,
                },
            ];
        });
    });
    console.log(angsuranData);
    const kontrakAngsuranId = kontrakAngsurans.map((data) => data.id);
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
                value: data.angsuran
                    ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(
                          data.pembiayaan.jumlah_pengajuan -
                              data.angsuran_pokok *
                                  data.angsuran.filter(
                                      (angsuran) => angsuran.status === "paid"
                                  ).length
                      )
                    : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                      }).format(data.pembiayaan.jumlah_pengajuan),
            },
            {
                label: "Angsuran Bulanan",
                value: new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(data.angsuran_pokok),
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

    const showAngsuranData = (angsuranData) => {
        let allAngsuranData = [];
        for (let i = 0; i < angsuranData.length; i++) {
            allAngsuranData = allAngsuranData.concat(angsuranData[i]);
        }
        const sortedAllAngsuranData = allAngsuranData.sort((a, b) => {
            return new Date(a[1].value) - new Date(b[1].value);
        });
        return sortedAllAngsuranData.map((data, index) => (
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
        ));
    };

    return (
        <Layout user={userRole}>
            <Head title="Informasi Angsuran" />
            <div className="card p-fluid tail-overflow-auto tail-h-screen">
                <h3 className="text-center p-2">Informasi Angsuran</h3>
                <div className="p-2 tail-grid tail-justify-items-center md:tail-grid-cols-2 lg:tail-grid-cols-3 tail-gap-4">
                    {kontrakAngsuranData.map((data, index) => (
                        <table
                            className="tail-bg-white tail-border-2 tail-border-gray-200 tail-mx-auto"
                            key={index}
                        >
                            <tbody>
                                {data.map((item) => (
                                    <tr
                                        className="tail-border-2 tail-border-gray-200 tail-text-center"
                                        key={index}
                                    >
                                        <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left">
                                            {item.label}
                                        </td>
                                        <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left tail-line-clamp-1 tail-overflow-auto">
                                            {item.value}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="tail-border-2 tail-border-gray-200 tail-text-center">
                                    <td
                                        className="tail-py-1 tail-px-2"
                                        colSpan={2}
                                    >
                                        <Link
                                            href={route(
                                                "kontrak-angsuran.show",
                                                {
                                                    kontrak_angsuran:
                                                        kontrakAngsuranId[
                                                            index
                                                        ],
                                                }
                                            )}
                                        >
                                            <Button label="Bayar Angsuran" />
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
                {kontrakAngsurans.length > 0 && (
                    <>
                        <h3 className="text-center p-2">Riwayat Pembayaran</h3>
                        <table className="tail-min-w-full tail-bg-white tail-border-2 tail-border-gray-200">
                            <thead className="tail-sticky tail-top-0 tail-z-50">
                                <tr className="tail-border-2 tail-border-gray-200 tail-bg-gray-200">
                                    <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                        No Pembiayaan
                                    </th>
                                    <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                        Tanggal Pembayaran
                                    </th>
                                    <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                        Jumlah Pembayaran
                                    </th>
                                    <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                        Angsuran Ke
                                    </th>
                                    <th className="tail-text-center tail-py-3 tail-px-4 tail-uppercase tail-font-bold tail-text-sm">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{showAngsuranData(angsuranData)}</tbody>
                        </table>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default KontrakAngsuran;
