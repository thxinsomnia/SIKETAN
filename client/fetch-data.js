async function fetchData() {
    try {
        const response = await fetch('http://localhost:5123/pangan', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            // Mendapatkan elements dari DOM
            const tableBody = document.querySelector('#data-table tbody');
            const tahunSelect = document.querySelector('#Tahunid');

            // Fungsi untuk memperbarui tabel berdasarkan tahun yang dipilih
            function updateTable(selectedTahun) {
                console.log('Selected Tahun:', selectedTahun);

                // Mengosongkan table body
                tableBody.innerHTML = '';

                // Menambah data ke tabel sesuai tahun yang dipilih
                data.filter(item => item.Tahun === parseInt(selectedTahun)).forEach(item => {
                    const row = document.createElement('tr');

                    const namaProvinsiCell = document.createElement('td');
                    const luasPanenCell = document.createElement('td');
                    const produktivitasCell = document.createElement('td');
                    const produksiCell = document.createElement('td');

                    namaProvinsiCell.textContent = item.Nama_Provinsi;
                    luasPanenCell.textContent = item.Luas_Panen;
                    produktivitasCell.textContent = item.Produktivitas;
                    produksiCell.textContent = item.Produksi;

                    row.appendChild(namaProvinsiCell);
                    row.appendChild(luasPanenCell);
                    row.appendChild(produktivitasCell);
                    row.appendChild(produksiCell);
                    tableBody.appendChild(row);
                });
            }

            // Event listener untuk perubahan pada select
            tahunSelect.addEventListener('change', () => {
                const selectedTahun = tahunSelect.value;
                updateTable(selectedTahun);
            });

            // Trigger change event saat pertama kali untuk memuat data awal
            tahunSelect.dispatchEvent(new Event('change'));
        } else {
            const errorData = await response.json();
            console.error('Error data:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();