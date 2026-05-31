const devices = [
    { name: "Dell OptiPlex 7090", sn: "DL7090001", type: "Máy bàn", status: "Hoạt động" },
    { name: "HP LaserJet Pro M404", sn: "HP404001", type: "Máy in", status: "Hoạt động" },
    { name: "Lenovo ThinkPad X1", sn: "LN-X1-001", type: "Laptop", status: "Hoạt động" },
    { name: "Ubuntu Server 20.04", sn: "UB-SRV-001", type: "Máy chủ", status: "Hoạt động" },
    { name: "LG UltraWide 34WN80C", sn: "LG34WN001", type: "Màn hình", status: "Không hoạt động" },
    { name: "LG 27GP850", sn: "LG27GP85001", type: "Màn hình", status: "Hoạt động" }
];

function renderDevices() {
    const grid = document.getElementById('deviceGrid');
    grid.innerHTML = ''; 

    devices.forEach(device => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        col.innerHTML = `
            <div class="card p-3 h-100">
                <h6 class="fw-bold mb-1">${device.name}</h6>
                <div class="text-secondary" style="font-size: 14px;">
                    <div>SN: ${device.sn}</div>
                    <div class="fw-bold text-dark mt-1">${device.type}</div>
                    <div class="${device.status === 'Hoạt động' ? 'text-dark' : 'text-danger'} fw-bold">${device.status}</div>
                </div>
                <div class="mt-2">
                    <button class="btn-action">Sửa</button>
                    <button class="btn-action">Xóa</button>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

renderDevices();