import React, { useEffect, useState } from "react";
import { Head, usePage, Link, useForm, router } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import InputError from "@/Components/InputError";
import { Dialog } from "primereact/dialog";

export default function Create({ auth, userId }) {
    const { flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const {
        data,
        setData,
        post: create,
        reset,
        processing,
        errors,
    } = useForm({
        nama_lengkap: "",
        user_id: userId,
        no_rekening: "",
        usaha: "",
        alamat: "",
        laba_usaha: "",
        jumlah_pengajuan: "",
        no_telp: "",
        jangka_waktu: "",
        jaminan: "",
        jenis_akad: "",
    });

    const submit = (e) => {
        e.preventDefault();
        create(route("pembiayaan.store"), {
            preserveScroll: true,
            onError: () => console.log(errors),
            onSuccess: () => {
                reset();
            },
        });
    };

    const resetForm = () => {
        setData({
            nama_lengkap: "",
            user_id: userId,
            no_rekening: "",
            usaha: "",
            alamat: "",
            laba_usaha: "",
            jumlah_pengajuan: "",
            no_telp: "",
            jangka_waktu: "",
            jaminan: "",
            jenis_akad: "",
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

    return (
        <Layout>
            <Head title="Formulir Permohonan Pembiayaan" />
            <Dialog
                header="Sukses!"
                visible={showModal}
                style={{ width: "50vw" }}
                onHide={() => setShowModal(false)}
            >
                <h3>{flash.success}</h3>
                <div className="flex gap-2">
                    <Button
                        label="Ke Beranda"
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
            <form onSubmit={submit} className="card p-fluid grid">
                <h3 className="text-center p-2 col-12">
                    Formulir Permohonan Pembiayaan
                </h3>
                <div className="col-12 md:col-6">
                    <div className="field">
                        <label htmlFor="nama_lengkap">Nama Lengkap</label>
                        <InputText
                            name="nama_lengkap"
                            id="nama_lengkap"
                            type="text"
                            value={data.nama_lengkap}
                            onChange={(e) =>
                                setData("nama_lengkap", e.target.value)
                            }
                        />
                        <InputError message={errors.nama_lengkap} />
                    </div>
                    <div className="field">
                        <label htmlFor="no_rekening">No Rekening</label>
                        <InputText
                            name="no_rekening"
                            id="no_rekening"
                            type="number"
                            value={data.no_rekening}
                            onChange={(e) =>
                                setData("no_rekening", e.target.value)
                            }
                        />
                        <InputError message={errors.no_rekening} />
                    </div>
                    <div className="field">
                        <label htmlFor="usaha">Usaha</label>
                        <InputText
                            name="usaha"
                            id="usaha"
                            type="text"
                            value={data.usaha}
                            onChange={(e) => setData("usaha", e.target.value)}
                        />
                        <InputError message={errors.usaha} />
                    </div>
                    <div className="field">
                        <label htmlFor="alamat">Alamat Usaha</label>
                        <InputText
                            name="alamat"
                            id="alamat"
                            type="text"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                        />
                        <InputError message={errors.alamat} />
                    </div>
                    <div className="field">
                        <label htmlFor="no_telp">No Telp</label>
                        <InputText
                            name="no_telp"
                            id="no_telp"
                            type="number"
                            value={data.no_telp}
                            onChange={(e) => setData("no_telp", e.target.value)}
                        />
                        <InputError message={errors.no_telp} />
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="field">
                        <label htmlFor="laba_usaha">Laba Usaha</label>
                        <InputText
                            name="laba_usaha"
                            id="laba_usaha"
                            type="number"
                            placeholder="Rp ..."
                            value={data.laba_usaha}
                            onChange={(e) =>
                                setData("laba_usaha", e.target.value)
                            }
                        />
                        <InputError message={errors.laba_usaha} />
                    </div>
                    <div className="field">
                        <label htmlFor="jumlah_pengajuan">
                            Jumlah Pengajuan
                        </label>
                        <select
                            name="jumlah_pengajuan"
                            id="jumlah_pengajuan"
                            value={data.jumlah_pengajuan}
                            onChange={(e) =>
                                setData("jumlah_pengajuan", e.target.value)
                            }
                            className="p-fluid p-inputtext p-component"
                        >
                            <option value="" disabled>
                                Rp...
                            </option>
                            <option value="5000000">Rp5.000.000</option>
                            <option value="10000000">Rp10.000.000</option>
                            <option value="15000000">Rp15.000.000</option>
                            <option value="20000000">Rp20.000.000</option>
                            <option value="25000000">Rp25.000.000</option>
                            <option value="50000000">Rp50.000.000</option>
                            <option value="75000000">Rp75.000.000</option>
                            <option value="80000000">Rp80.000.000</option>
                            <option value="90000000">Rp90.000.000</option>
                            <option value="100000000">Rp100.000.000</option>
                        </select>
                        <InputError message={errors.jumlah_pengajuan} />
                    </div>
                    <div className="field">
                        <label htmlFor="jangka_waktu">Jangka Waktu</label>
                        <select
                            name="jangka_waktu"
                            id="jangka_waktu"
                            value={data.jangka_waktu}
                            onChange={(e) =>
                                setData("jangka_waktu", e.target.value)
                            }
                            className="p-fluid p-inputtext p-component"
                        >
                            <option value="" disabled>
                                ... Bulan
                            </option>
                            <option value="12 bulan">12 Bulan</option>
                            <option value="24 bulan">24 Bulan</option>
                            <option value="36 bulan">36 Bulan</option>
                            <option value="48 bulan">48 Bulan</option>
                            <option value="60 bulan">60 Bulan</option>
                        </select>
                        <InputError message={errors.jangka_waktu} />
                    </div>
                    <div className="field">
                        <label htmlFor="jaminan">Jaminan</label>
                        <select
                            name="jaminan"
                            id="jaminan"
                            value={data.jaminan}
                            onChange={(e) => setData("jaminan", e.target.value)}
                            className="p-fluid p-inputtext p-component"
                        >
                            <option value="" disabled>
                                Pilih Jaminan
                            </option>
                            <option value="SHM/SHGB">SHM/SHGB</option>
                            <option value="BKPB Kendaraan Bermotor">
                                BKPB Kendaraan Bermotor
                            </option>
                            <option value="Cash Collateral">
                                Cash Collateral
                            </option>
                            <option value="Girik & Letter C">
                                Girik & Letter C
                            </option>
                        </select>
                        <InputError message={errors.jaminan} />
                    </div>
                    <div className="field">
                        <label htmlFor="jenis_akad">Jenis Akad</label>
                        <InputText
                            name="jenis_akad"
                            id="jenis_akad"
                            value={(data.jenis_akad = "Murabahah")}
                            type="text"
                            disabled
                        />
                    </div>
                </div>
                <div className="p-fluid grid w-full">
                    <div className="col-12 md:col-6">
                        <Button
                            label="Submit"
                            type="submit"
                            severity="success"
                            disabled={processing}
                        />
                    </div>
                    <div className="col-12 md:col-3">
                        <Button
                            label="Reset"
                            type="button"
                            severity="secondary"
                            onClick={resetForm}
                        />
                    </div>
                    <div className="col-12 md:col-3">
                        <Button
                            label="Kembali"
                            type="button"
                            severity="danger"
                        />
                    </div>
                </div>
            </form>
        </Layout>
    );
}
