import React, { useEffect, useState } from "react";
import { Head, usePage, Link, useForm, router } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import InputError from "@/Components/InputError";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";

const BayarAngsuran = ({ auth, kontrakAngsuran }) => {
    const { flash } = usePage().props;
    const userRole = auth.user.role;
    const [showModal, setShowModal] = useState(false);
    const {
        data,
        setData,
        post: create,
        reset,
        processing,
        errors,
    } = useForm({
        kontrak_angsuran_id: kontrakAngsuran.id,
        angsuran_ke: "",
        jumlah_angsuran: "",
        tanggal_bayar: "",
        metode_pembayaran: "",
        bukti_pembayaran: null,
        catatan: "",
    });

    const submit = (e) => {
        e.preventDefault();
        create(route("angsuran.store"), {
            preserveScroll: true,
            onError: () => console.log(errors),
            onSuccess: () => {
                reset();
            },
        });
    };

    const resetForm = () => {
        setData({
            kontrak_angsuran_id: kontrakAngsuran.id,
            jumlah_angsuran: "",
            tanggal_bayar: "",
            metode_pembayaran: "",
            catatan: "",
        });
    };

    useEffect(() => {
        if (flash.success) {
            setShowModal(true);
            setTimeout(() => {
                flash.success = null;
            }, 2500);
        }
    }, [flash.success]);

    const dataKontrakAngsuran = [
        {
            label: "No Pembiayaan",
            value: kontrakAngsuran.pembiayaan.id,
        },
        {
            label: "Nama Nasabah",
            value: kontrakAngsuran.pembiayaan.nama_lengkap,
        },
        {
            label: "Total Pembiayaan",
            value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(kontrakAngsuran.pembiayaan.jumlah_pengajuan),
        },
        {
            label: "Sisa Pembayaran",
            value: kontrakAngsuran.angsuran
                ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                  }).format(
                      kontrakAngsuran.pembiayaan.jumlah_pengajuan -
                          kontrakAngsuran.angsuran_pokok *
                              kontrakAngsuran.angsuran.filter(
                                  (angsuran) => angsuran.status === "paid"
                              ).length
                  )
                : new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                  }).format(kontrakAngsuran.pembiayaan.jumlah_pengajuan),
        },
        {
            label: "Angsuran Bulanan",
            value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(kontrakAngsuran.angsuran_pokok),
        },
        {
            label: "Tanggal Jatuh Tempo",
            value: new Date(
                kontrakAngsuran.tanggal_jatuh_tempo
            ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
        },
        {
            label: "Nisbah/Bagi Hasil Nasabah",
            value: `${kontrakAngsuran.nisbah_nasabah}%`,
        },
        {
            label: "Nisbah/Bagi Hasil Bank",
            value: `${kontrakAngsuran.nisbah_bank}%`,
        },
    ];

    const handleBuktiPembayaran = (e) => {
        setData({ ...data, bukti_pembayaran: e.target.files[0] });
    };

    const routeParameter = kontrakAngsuran.id;
    return (
        <Layout user={userRole} routeParameterAngsuran={routeParameter}>
            <Head title="Bayar Angsuran" />
            <div className="card p-fluid tail-min-h-screen">
                <h3 className="tail-text-center">Bayar Angsuran</h3>
                <div className="tail-overflow-auto tail-max-w-screen tail-p-4">
                    <table className="tail-bg-white tail-border-2 tail-border-gray-200 tail-mx-auto">
                        <tbody>
                            <td className="tail-border-2 tail-border-gray-200">
                                {dataKontrakAngsuran
                                    .slice(0, 4)
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
                                {dataKontrakAngsuran
                                    .slice(4, 8)
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
                <form onSubmit={submit}>
                    <div className="p-fluid">
                        <div className="field">
                            <label htmlFor="angsuran_ke">Angsuran Ke</label>
                            <InputText
                                id="angsuran_ke"
                                type="text"
                                value={
                                    (data.angsuran_ke = kontrakAngsuran.angsuran
                                        ? kontrakAngsuran.angsuran.filter(
                                              (angsuran) =>
                                                  angsuran.status === "paid"
                                          ).length + 1
                                        : 1)
                                }
                                onChange={(e) =>
                                    setData("angsuran_ke", e.target.value)
                                }
                                disabled
                            />
                            <InputError message={errors.angsuran_ke} />
                        </div>
                        <div className="field">
                            <label htmlFor="jumlah_angsuran">
                                Jumlah Angsuran
                            </label>
                            <select
                                id="jumlah_angsuran"
                                name="jumlah_angsuran"
                                onChange={(e) =>
                                    setData("jumlah_angsuran", e.target.value)
                                }
                                disabled
                                value={
                                    (data.jumlah_angsuran =
                                        kontrakAngsuran.angsuran_pokok)
                                }
                                className="p-fluid p-inputtext p-component"
                            >
                                <option
                                    value={kontrakAngsuran.angsuran_pokok}
                                    selected
                                >
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(kontrakAngsuran.angsuran_pokok)}
                                </option>
                            </select>
                            <InputError message={errors.jumlah_angsuran} />
                        </div>
                        <div className="field">
                            <label htmlFor="tanggal_bayar">
                                Tanggal Pembayaran
                            </label>
                            <Calendar
                                id="tanggal_bayar"
                                value={data.tanggal_bayar}
                                onChange={(e) =>
                                    setData("tanggal_bayar", e.target.value)
                                }
                                dateFormat="dd/mm/yy"
                            />
                            <InputError message={errors.tanggal_bayar} />
                        </div>
                        <div className="field">
                            <label htmlFor="metode_pembayaran">
                                Metode Pembayaran
                            </label>
                            <select
                                name="metode_pembayaran"
                                id="metode_pembayaran"
                                className="p-fluid p-inputtext p-component"
                                value={data.metode_pembayaran}
                                onChange={(e) =>
                                    setData("metode_pembayaran", e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Pilih Metode Pembayaran
                                </option>
                                <option value="transfer">Transfer Bank</option>
                                <option value="tunai">Tunai</option>
                            </select>
                            <InputError message={errors.metode_pembayaran} />
                        </div>
                        <div className="field">
                            <label htmlFor="bukti_pembayaran">
                                Bukti Pembayaran
                            </label>
                            <InputText
                                id="bukti_pembayaran"
                                name="bukti_pembayaran"
                                type="file"
                                accept="image/*"
                                onChange={handleBuktiPembayaran}
                            />
                            <InputError message={errors.bukti_pembayaran} />
                            {data.bukti_pembayaran && (
                                <img
                                    src={URL.createObjectURL(
                                        data.bukti_pembayaran
                                    )}
                                    alt="bukti pembayaran"
                                    className="tail-mt-2 tail-max-w-xs"
                                />
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="catatan">Catatan</label>
                            <InputText
                                id="catatan"
                                type="text"
                                value={data.catatan}
                                onChange={(e) =>
                                    setData("catatan", e.target.value)
                                }
                            />
                            <InputError message={errors.catatan} />
                        </div>
                        {kontrakAngsuran.angsuran
                            ? kontrakAngsuran.angsuran.filter(
                                  (angsuran) => angsuran.status === "pending"
                              ).length > 0 && (
                                  <div className="tail-mb-4">
                                      <p className="tail-text-yellow-500 tail-font-bold">
                                          Mohon tunggu hingga pembayaran
                                          angsuran terakhir selesai diproses
                                      </p>
                                  </div>
                              )
                            : null}
                        <div className="tail-flex tail-gap-4">
                            <Button
                                label="Submit"
                                icon="pi pi-check"
                                loading={processing}
                                disabled={
                                    kontrakAngsuran.angsuran
                                        ? kontrakAngsuran.angsuran.filter(
                                              (angsuran) =>
                                                  angsuran.status === "pending"
                                          ).length > 0
                                        : false
                                }
                            />
                            <Button
                                label="Reset"
                                icon="pi pi-refresh"
                                onClick={resetForm}
                                outlined
                            />
                        </div>
                    </div>
                </form>
            </div>
            <Dialog
                header="Sukses!"
                visible={showModal}
                style={{ width: "50vw" }}
                onHide={() => {
                    setShowModal(false);
                }}
            >
                <h3>{flash.success}</h3>
                <div className="flex gap-2">
                    <Button
                        label="Ke Dashboard"
                        onClick={() => {
                            setShowModal(false);
                            router.visit("/dashboard");
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

export default BayarAngsuran;
