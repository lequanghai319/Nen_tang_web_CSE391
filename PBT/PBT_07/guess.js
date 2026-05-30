function playGame() {
    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let history = [];
    alert("Máy đã chọn một số từ 1-100. Bạn có tối đa 7 lần đoán!");

    while (attempts < 7) {
        let input = prompt(`Lần đoán ${attempts + 1}/7. Nhập số:`);
        if (input === null) return alert("Bạn đã thoát game!");

        let guess = parseInt(input);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Vui lòng nhập số hợp lệ (1-100)!");
            continue;
        }

        if (history.includes(guess)) {
            alert("Số này đoán rồi mà, chọn số khác đi!");
            continue;
        }

        history.push(guess);
        attempts++;

        if (guess === target) {
            return alert(`🎉 ĐÚNG RỒI! Bạn chiến thắng sau ${attempts} lần đoán!`);
        } else if (guess > target) {
            alert("Thấp hơn cơ!");
        } else {
            alert("Cao hơn cơ!");
        }
    }
    alert(`GAME OVER! Hết 7 lượt. Đáp án là: ${target}`);
}