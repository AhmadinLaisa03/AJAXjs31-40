<?php 
    require_once("koneksi.php");

    $data = stripslashes(file_get_contents("php://input"));
    // mengubah json kebentuk array
    $dataPelanggan = json_decode($data, true);

    // pengisian variabel yang kemudian akan diinsert ke dalam table
    $pelanggan = $dataPelanggan['pelanggan'];
    $alamat = $dataPelanggan['alamat'];
    $telp = $dataPelanggan['telp'];

    if (!empty($pelanggan) && !empty($alamat) && !empty($telp)) {
        
        $sql = "INSERT INTO tblpelanggan VALUES('','$pelanggan','$alamat','$telp','','','')";
        if ($result = mysqli_query($koneksiKeDb, $sql)) {
            echo 'Data sudah disimpan !';
        } else {
            echo 'Data gagal disimpan !';
        }
    } else {
        echo 'Data kosong';
    }
?>