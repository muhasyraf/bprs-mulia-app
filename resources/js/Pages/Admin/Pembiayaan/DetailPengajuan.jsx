import React, { useEffect, useState } from "react";
import { Head, usePage, Link, useForm, router } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { InputText } from "primereact/inputtext";
import InputError from "@/Components/InputError";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";

const DetailPengajuan = ({ auth, pembiayaan }) => {
    const { flash } = usePage().props;
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [flashMessage, setFlashMessage] = useState("");
    const [showKontrakAngsuranForm, setShowKontrakAngsuranForm] =
        useState(false);
    const {
        data,
        setData,
        post: create,
        processing,
        errors,
        reset,
    } = useForm({
        pembiayaan_id: pembiayaan.id,
        angsuran_pokok: "",
        tanggal_jatuh_tempo: "",
        nisbah_nasabah: "",
        nisbah_bank: "",
        tanggal_survei: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        create(route("kontrak-angsuran.store"), {
            onSuccess: () => {
                reset();
                setShowKontrakAngsuranForm(false);
            },
        });
    };

    const dataPembiayaan = [
        {
            label: "No Pengajuan",
            value: pembiayaan.id,
        },
        {
            label: "Nama",
            value: pembiayaan.nama_lengkap,
        },
        {
            label: "No Rekening",
            value: pembiayaan.no_rekening,
        },
        {
            label: "Usaha",
            value: pembiayaan.usaha,
        },
        {
            label: "Laba Usaha",
            value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(pembiayaan.laba_usaha),
        },
        {
            label: "Alamat Usaha",
            value: pembiayaan.alamat,
        },
        {
            label: "No Telepon",
            value: pembiayaan.no_telp,
        },
        {
            label: "Jumlah Pengajuan",
            value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(pembiayaan.jumlah_pengajuan),
        },
        {
            label: "Jaminan",
            value: pembiayaan.jaminan,
        },
        {
            label: "Jenis Akad",
            value: pembiayaan.jenis_akad,
        },
        {
            label: "Tanggal Pengajuan",
            value: new Date(pembiayaan.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
        },
        {
            label: "Status Pengajuan",
            value: <StatusBadge status={pembiayaan.status} />,
        },
    ];

    const kontrakAngsuranForm = () => {
        return (
            <div className="card p-fluid tail-mt-8">
                <form onSubmit={handleSubmit} className="grid">
                    <div className="col-12">
                        <h3 className="text-center">
                            Persetujuan Permohonan Pembiayaan
                        </h3>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="angsuran_pokok">
                                Angsuran Pokok
                            </label>
                            <InputText
                                id="angsuran_pokok"
                                type="number"
                                value={data.angsuran_pokok}
                                onChange={(e) =>
                                    setData("angsuran_pokok", e.target.value)
                                }
                            />
                            <InputError error={errors.angsuran_pokok} />
                        </div>
                        <div className="field">
                            <label htmlFor="tanggal_jatuh_tempo">
                                Tanggal Jatuh Tempo
                            </label>
                            <Calendar
                                id="tanggal_jatuh_tempo"
                                value={data.tanggal_jatuh_tempo}
                                onChange={(e) =>
                                    setData(
                                        "tanggal_jatuh_tempo",
                                        e.target.value
                                    )
                                }
                                dateFormat="dd/mm/yy"
                            />
                            <InputError error={errors.tanggal_jatuh_tempo} />
                        </div>
                        <div className="field">
                            <label htmlFor="nisbah_nasabah">
                                Nisbah/Bagi Hasil Nasabah (%)
                            </label>
                            <InputText
                                id="nisbah_nasabah"
                                type="number"
                                value={data.nisbah_nasabah}
                                onChange={(e) =>
                                    setData("nisbah_nasabah", e.target.value)
                                }
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="nisbah_bank">
                                Nisbah/Bagi Hasil Bank (%)
                            </label>
                            <InputText
                                id="nisbah_bank"
                                type="number"
                                value={data.nisbah_bank}
                                onChange={(e) =>
                                    setData("nisbah_bank", e.target.value)
                                }
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="tanggal_survei">
                                Tanggal Survei
                            </label>
                            <Calendar
                                id="tanggal_survei"
                                value={data.tanggal_survei}
                                onChange={(e) =>
                                    setData("tanggal_survei", e.target.value)
                                }
                                dateFormat="dd/mm/yy"
                            />
                        </div>
                    </div>
                    <div className="col-12 tail-flex gap-4">
                        <Button
                            label="Simpan"
                            type="submit"
                            severity="success"
                            loading={processing}
                        />
                        <Button
                            label="Batal"
                            onClick={() => {
                                setShowKontrakAngsuranForm(false);
                            }}
                            severity="danger"
                        />
                    </div>
                </form>
            </div>
        );
    };

    useEffect(() => {
        if (flash.success) {
            setFlashMessage(flash.success);
            setShowSuccessModal(true);
            setTimeout(() => {
                flash.success = "";
            }, 3000);
        }
    }, [flash.success]);

    const routeParameter = pembiayaan.id;
    return (
        <Layout routeParameter={routeParameter}>
            <Head title="Detail Pengajuan" />
            <Dialog
                header="Sukses!"
                visible={showSuccessModal}
                style={{ width: "50vw" }}
                onHide={() => setShowSuccessModal(false)}
            >
                <h3>{flashMessage}</h3>
                <div className="flex gap-2">
                    <Button
                        label="Ke Beranda"
                        onClick={() => {
                            setShowSuccessModal(false);
                            router.visit("/dashboard");
                        }}
                        className="p-button-info"
                    />
                    <Button
                        label="Tutup"
                        onClick={() => setShowSuccessModal(false)}
                        className="p-button-secondary"
                    />
                </div>
            </Dialog>
            <div className="card p-fluid tail-min-h-screen">
                <h3 className="text-center">
                    Formulir Permohonan Pembiayaan Nasabah
                </h3>
                <div className="tail-overflow-auto tail-max-w-screen">
                    <table className="tail-bg-white tail-border-2 tail-border-gray-200 tail-mx-auto">
                        <tbody>
                            <td className="tail-border-2 tail-border-gray-200">
                                {dataPembiayaan
                                    .slice(0, 6)
                                    .map((data, index) => (
                                        <tr
                                            className="tail-text-center"
                                            key={index}
                                        >
                                            <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left tail-border-r-2 tail-border-gray-200">
                                                {data.label}
                                            </td>
                                            <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left tail-line-clamp-1 tail-overflow-auto">
                                                {data.value}
                                            </td>
                                        </tr>
                                    ))}
                            </td>
                            <td className="tail-border-2 tail-border-gray-200">
                                {dataPembiayaan
                                    .slice(6, 12)
                                    .map((data, index) => (
                                        <tr
                                            className="tail-text-center"
                                            key={index}
                                        >
                                            <td className="tail-min-w-max tail-py-3 tail-px-4 tail-text-left tail-border-r-2 tail-border-gray-200">
                                                {data.label}
                                            </td>
                                            <td className="tail-max-w-sm tail-py-3 tail-px-4 tail-font-medium tail-text-left tail-line-clamp-1 tail-overflow-auto">
                                                {data.value}
                                            </td>
                                        </tr>
                                    ))}
                            </td>
                        </tbody>
                    </table>
                </div>
                {pembiayaan.status === "pending" && (
                    <div className="tail-mt-5 tail-text-center tail-flex tail-gap-4 md:tail-w-1/3 tail-mx-auto">
                        <Button
                            label="Setuju"
                            onClick={() => {
                                setShowKontrakAngsuranForm(true);
                            }}
                        />
                        <Button
                            label="Tolak"
                            onClick={() => {
                                router.post(
                                    `/pembiayaan/${pembiayaan.id}`,
                                    {
                                        _method: "put",
                                        status: "rejected",
                                    },
                                    {
                                        preserveState: true,
                                    }
                                );
                            }}
                            outlined
                        />
                    </div>
                )}
                {showKontrakAngsuranForm && kontrakAngsuranForm()}
            </div>
        </Layout>
    );
};

export default DetailPengajuan;
