<?php
    // melakukan koneksi ke db dengan memanggil file koneksi.php
    require_once("koneksi.php");

    $data = stripslashes(file_get_contents("php://input"));
    // mengubah json kebentuk array
    $idPelanggan = json_decode($data, true);

    // pengisian id
    $idpelanggan = $idPelanggan['idpelanggan'];

    $sql = "SELECT * FROM tblpelanggan WHERE idpelanggan = $idpelanggan";
    $result = mysqli_query($koneksiKeDb, $sql);

    $row = mysqli_fetch_assoc($result);

    echo json_encode($row);
