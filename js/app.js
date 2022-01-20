$(document).ready(function () {
    // alert('Please wait');

    let id = "";
    let pelanggan = "";
    let alamat = "";
    let telp = "";

    // event untuk tombol simpan, jika id == 0 maka akan melakukan insert, tapi jika id != 0 maka akan melakukan update
    $("#submit").click(function (e) { 
        e.preventDefault();
        id = $("#id").val();;
        pelanggan = $("#pelanggan").val();
        alamat = $("#alamat").val();
        telp = $("#telp").val();

        if (id == "") {
            insertData();
        } else {
            updateData();
        }

        $("#pelanggan").val("");
        $("#alamat").val("");
        $("#telp").val("");
    });

    $("#btn-tambah").click(function (e) { 
        e.preventDefault();
        
        $("#titel").html("<p>Tambah Data</p>");

        $("#pelanggan").val("");
        $("#alamat").val("");
        $("#telp").val("");
    });

    // memberi event ke class btn-del di dalam element tbody
    $("tbody").on("click", ".btn-del", function () {
        // memasukkan atribut data-id ke variabel id 
        let id = $(this).attr("data-id");
        deleteData(id);
    });
    
    // memberi event ke class btn-update di dalam element tbody
    $("tbody").on("click", ".btn-update", function () {
        // memasukkan atribut data-id ke variabel id 
        let id = $(this).attr("data-id");
        $("#titel").html("<p>Ubah Data</p>");
        selectUpdate(id);
    });

    function selectUpdate(id) {
        let idPelanggan = {
            idpelanggan: id
        }

        // console.log(dataPelanggan);

        $.ajax({
            type: "post",
            url: "php/selectUpdate.php",
            Cache: false,
            data: JSON.stringify(idPelanggan),
            // dataType: "dataType",
            success: function (response) {
                let data = JSON.parse(response);
                // console.log(data.idpelanggan);
                // console.log(data.pelanggan);
                // console.log(data.alamat);
                // console.log(data.telp);

                $("#id").val(data.idpelanggan);
                $("#pelanggan").val(data.pelanggan);
                $("#alamat").val(data.alamat);
                $("#telp").val(data.telp);
            }
        });
    }

    // pembuatan fungsi" untuk memanipulasi data
    function selectData() {
        // script ajax
        $.ajax({
            type: "get",
            url: "php/select.php",
            Cache: false,
            dataType: "json",
            success: function (response) {
                // console.log(response);

                let out = "";
                let no = 1;
                // menampilkan satu persatu data dari json ke dalam tabel
                $.each(response, function (key, val) {
                    out += `<tr>
                        <td>${no++}</td>
                        <td>${val.pelanggan}</td>
                        <td>${val.alamat}</td>
                        <td>${val.telp}</td>
                        <td><button type="button" class="btn btn-danger btn-del" data-id="${val.idpelanggan}">Hapus</button></td>
                        <td><button type="button" class="btn btn-warning btn-update" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${val.idpelanggan}">Update</button></td>
                    </tr>`;
                });

                $("#isidata").html(out);
            }
        });
    }

    selectData();

    function insertData() {
        let dataPelanggan = {
            pelanggan: pelanggan,
            alamat: alamat,
            telp: telp,
        }

        // console.log(dataPelanggan);

        $.ajax({
            type: "post",
            url: "php/insert.php",
            Cache: false,
            data: JSON.stringify(dataPelanggan),
            // dataType: "dataType",
            success: function (response) {
                let output = `<p>${response}</p>`;
                $("#msg").html(output)
            }
        });
        selectData();
    }


    function deleteData(id) {
        // prompt("Are you sure you want to delete " + id + "?");
        if (confirm("yakin ingin menghapus ?")) {
            let idPelanggan = {
                idpelanggan: id
            }

        // console.log(dataPelanggan);

            $.ajax({
                type: "post",
                url: "php/delete.php",
                Cache: false,
                data: JSON.stringify(idPelanggan),
                // dataType: "dataType",
                success: function (response) {
                    let output = `<p>${response}</p>`;
                    $("#msg").html(output);
                    selectData();
                }
            });
            selectData();
        }
    }
    selectData();

    function updateData() {
        let dataPelanggan = {
            pelanggan: pelanggan,
            idpelanggan: id,
            alamat: alamat,
            telp: telp,
        }

        // console.log(dataPelanggan);

        $.ajax({
            type: "post",
            url: "php/update.php",
            Cache: false,
            data: JSON.stringify(dataPelanggan),
            // dataType: "dataType",
            success: function (response) {
                let output = `<p>${response}</p>`;
                $("#msg").html(output);
                selectData();
            }
        });
        selectData();
    }
});