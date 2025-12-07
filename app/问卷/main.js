// 更新进度条
function updateProgress() {
    const form = document.getElementById('surveyForm');
    const inputs = form.querySelectorAll('input[type="radio"], input[type="checkbox"], textarea, select');
    const requiredInputs = form.querySelectorAll('input[required]');
    let filledCount = 0;
    let requiredCount = 0;
    // 计算必填问题已回答的数量
    requiredInputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            const name = input.name;
            const checked = form.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
            if (checked) filledCount++;
            requiredCount++;
        }
    });
    // 计算完成百分比
    let percentage = requiredCount > 0 ? Math.min(100, Math.round((filledCount / requiredCount) * 100)) : 0;
    // 更新进度条
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = percentage + '%';
    return percentage;
}
// 监听所有输入变化
    document.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('change', updateProgress);
    element.addEventListener('input', updateProgress);
});
// 初始更新进度
updateProgress();
// 表单提交处理
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // 验证所有必填项
    const requiredInputs = this.querySelectorAll('input[required]');
    let allRequiredFilled = true;
    let missingQuestions = [];
    // 检查每个必填问题组
    const questionGroups = {};
    requiredInputs.forEach(input => {
        const name = input.name;
        if (!questionGroups[name]) {
            questionGroups[name] = [];
        }
        questionGroups[name].push(input);
    });
    // 检查每个问题组是否有选中项
    for (const name in questionGroups) {
        const checked = this.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
        if (!checked) {
            allRequiredFilled = false;
            const questionNumber = this.querySelector(`input[name="${name}"]`).closest('.question').querySelector('.question-number').textContent;
            missingQuestions.push(questionNumber);
        }
    }
    if (!allRequiredFilled) {
        alert(`请完成所有必填问题！\n未完成的问题：${missingQuestions.join('、')}`);
        return;
    }
    // 收集表单数据
    const formData = new FormData(this);
    const data = {};
    // 将表单数据转换为对象
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    // 在实际应用中，这里应该将数据发送到服务器
    // 这里我们只是模拟提交成功
    alert('问卷提交成功！感谢您的参与！');
    this.reset();
    updateProgress();
    // 在实际应用中，这里可以添加数据提交代码
    // fetch('/submit-survey', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response => {
    //     if (response.ok) {
    //         alert('问卷提交成功！感谢您的参与！');
    //         this.reset();
    //         updateProgress();
    //     }
    // });
});
// 为多选框添加逻辑：其他方法
const otherMethodCheckbox = document.getElementById('q2a5');
const otherMethodInput = document.createElement('input');
otherMethodInput.type = 'text';
otherMethodInput.placeholder = '请说明其他方法...';
otherMethodInput.style.marginLeft = '10px';
otherMethodInput.style.width = '200px';
otherMethodInput.style.display = 'none';
otherMethodCheckbox.parentNode.appendChild(otherMethodInput);
otherMethodCheckbox.addEventListener('change', function() {
    if (this.checked) {
        otherMethodInput.style.display = 'inline-block';
        otherMethodInput.focus();
    } else {
        otherMethodInput.style.display = 'none';
        otherMethodInput.value = '';
    }
});
