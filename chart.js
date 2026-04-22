/**
 * History Chart — Canvas bar chart with trend line overlay
 */

export function renderChart(canvasId, history) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  if (!history || history.length === 0) {
    ctx.fillStyle = '#a0aec0';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('No data yet', W / 2, H / 2 + 4);
    return;
  }

  const readings = history.slice(-10);
  const count = readings.length;
  const padL = 28, padR = 8, padT = 8, padB = 20;
  const cW = W - padL - padR;
  const cH = H - padT - padB;
  const barW = Math.floor(cW / 10);
  const gap = 3;

  // Y-axis gridlines
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  [0, 33, 66, 100].forEach(v => {
    const y = padT + cH - Math.round((v / 100) * cH);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.fillStyle = '#a0aec0';
    ctx.font = '9px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(v, padL - 3, y + 3);
  });

  // Bars
  readings.forEach((level, i) => {
    const barH = Math.round((level / 100) * cH);
    const x = padL + i * barW + gap;
    const y = padT + cH - barH;
    const w = barW - gap * 2;

    if (level <= 33) ctx.fillStyle = '#48bb78';
    else if (level <= 66) ctx.fillStyle = '#ed8936';
    else ctx.fillStyle = '#e53e3e';

    ctx.beginPath();
    ctx.roundRect(x, y, w, barH, 2);
    ctx.fill();
  });

  // Trend line
  if (count >= 2) {
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    readings.forEach((level, i) => {
      const x = padL + i * barW + barW / 2;
      const y = padT + cH - Math.round((level / 100) * cH);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // X-axis labels
  ctx.fillStyle = '#a0aec0';
  ctx.font = '9px Arial';
  ctx.textAlign = 'center';
  readings.forEach((_, i) => {
    const x = padL + i * barW + barW / 2;
    ctx.fillText(i + 1, x, H - 4);
  });
}
