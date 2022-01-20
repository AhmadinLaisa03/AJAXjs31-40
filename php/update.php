<?php 
    require_once("koneksi.php");

    $data = stripslashes(file_get_contents("php://input"));
    // mengubah json kebentuk array
    $dataPelanggan = json_decode($data, true);

    // pengisian variabel yang kemudian akan diupdate ke dalam table
    $pelanggan = $dataPelanggan['pelanggan'];
    $idpelanggan = $dataPelanggan['idpelanggan'];
    $alamat = $dataPelanggan['alamat'];
    $telp = $dataPelanggan['telp'];

    if (!empty($idpelanggan) && !empty($pelanggan) && !empty($alamat) && !empty($telp)) {
        
        $sql = "UPDATE tblpelanggan SET pelanggan='$pelanggan', alamat='$alamat', telp='$telp' WHERE idpelanggan=$idpelanggan";
        if ($result = mysqli_query($koneksiKeDb, $sql)) {
            echo 'Data berhasil di ubah !';
        } else {
            echo 'Data gagal diubah !';
        }
    } else {
        echo 'Data kosong';
    }
?>