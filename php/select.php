<?php
    // melakukan koneksi ke db dengan memanggil file koneksi.php
    require_once("koneksi.php");

    $sql = "SELECT * FROM tblpelanggan";
    $result = mysqli_query($koneksiKeDb, $sql);
    
    // print_r($result);

    // menguji jika jumlah baris di tabel lebih besar dari 0, maka tampilkan hasil query
    if (mysqli_num_rows($result) > 0) {
        // membuat variabel penampung data dari tabel yang berbentuk array
        $data = [];

        // mengambil satu persatu hasil query kemudian menyimpan nya di dalam variabel data
        while ($row = mysqli_fetch_assoc($result)) {
            $data[]= $row;
        }
    }

    echo json_encode($data);

?>