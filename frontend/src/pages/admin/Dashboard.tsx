import { onCleanup, onMount } from "solid-js";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import MainLayout from "./MainLayout";

const Dashboard = () => {
  let pieChartRoot: am5.Root;
  let lineChartRoot: am5.Root;

  onMount(() => {
    // === PIE CHART ===
    pieChartRoot = am5.Root.new("piechartdiv");

    // Disable amCharts watermark
    pieChartRoot._logo.dispose();

    // Set themes
    pieChartRoot.setThemes([am5themes_Animated.new(pieChartRoot)]);

    // Create pie chart
    let pieChart = pieChartRoot.container.children.push(
      am5percent.PieChart.new(pieChartRoot, {
        layout: pieChartRoot.verticalLayout,
        innerRadius: am5.percent(60),
      })
    );

    // Create pie series
    let pieSeries = pieChart.series.push(
      am5percent.PieSeries.new(pieChartRoot, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    // Customize slice colors
    pieSeries.slices.template.setAll({
      fillOpacity: 1,
      strokeOpacity: 0,
    });

    pieSeries.slices.template.adapters.add("fill", (fill, target) => {
      const data = target.dataItem?.dataContext as any;
      switch (data.category) {
        case "Tipe A": return am5.color("#9F0000");
        case "Tipe B": return am5.color("#F80000");
        case "Tipe C": return am5.color("#FFB9B9");
        default: return fill;
      }
    });

    // Remove labels
    pieSeries.labels.template.set("visible", false);

    // Customize tooltip
    pieSeries.slices.template.set("tooltipText", "{category}: {value} orang");

    // Set pie chart data
    const pieChartData = [
      { value: 6, category: "Tipe A" },
      { value: 5, category: "Tipe B" },
      { value: 3, category: "Tipe C" },
    ];
    pieSeries.data.setAll(pieChartData);

    // Display total in center
    const totalValue = pieChartData.reduce((sum, item) => sum + item.value, 0);
    pieChart.seriesContainer.children.push(
      am5.Label.new(pieChartRoot, {
        text: `${totalValue}`,
        fontSize: 28,
        fontWeight: "bold",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
      })
    );

    // Play animation
    pieSeries.appear(1000, 100);

    // === SMOOTHED LINE CHART ===
    lineChartRoot = am5.Root.new("linechartdiv");

    // Disable amCharts watermark
    lineChartRoot._logo.dispose();

    // Set themes
    lineChartRoot.setThemes([am5themes_Animated.new(lineChartRoot)]);

    // Create line chart
    let lineChart = lineChartRoot.container.children.push(
      am5xy.XYChart.new(lineChartRoot, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    // Create X axis renderer
    let xAxisRenderer = am5xy.AxisRendererX.new(lineChartRoot, {
      minGridDistance: 50,
    });
    
    // Menyembunyikan garis grid vertikal dengan menyetel properti pada grid template
    xAxisRenderer.grid.template.setAll({
      visible: false
    });

    // Create X axis
    let xAxis = lineChart.xAxes.push(
      am5xy.CategoryAxis.new(lineChartRoot, {
        categoryField: "month",
        renderer: xAxisRenderer,
        tooltip: am5.Tooltip.new(lineChartRoot, {})
      })
    );

    // Create Y axis renderer
    let yAxisRenderer = am5xy.AxisRendererY.new(lineChartRoot, {});
    
    // Mengatur garis grid horizontal agar tetap terlihat dengan opacity rendah
    yAxisRenderer.grid.template.setAll({
      visible: true,
      strokeOpacity: 0.1,
      stroke: am5.color("#000000")
    });

    // Create Y axis
    let yAxis = lineChart.yAxes.push(
      am5xy.ValueAxis.new(lineChartRoot, {
        renderer: yAxisRenderer,
        min: 0,
        max: 50,
        strictMinMax: false,
        numberFormat: "#",
        extraTooltipPrecision: 0,
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      forceHidden: false,
      minPosition: 0,
      maxPosition: 1,
    });

    // Create cursor for zooming
    let cursor = am5xy.XYCursor.new(lineChartRoot, {
      behavior: "zoomX",
      xAxis: xAxis
    });
    
    // Menyembunyikan garis horizontal pada cursor dan hanya menampilkan garis vertikal
    cursor.lineY.set("visible", false);
    cursor.lineX.set("visible", true);
    
    lineChart.set("cursor", cursor);

    // Generate data
    const lineChartData = [
      { month: "Jan", value: 10 },
      { month: "Feb", value: 15 },
      { month: "Mar", value: 8 },
      { month: "Apr", value: 20 },
      { month: "Mei", value: 12 },
      { month: "Jun", value: 18 },
      { month: "Jul", value: 25 },
      { month: "Agu", value: 30 },
      { month: "Sep", value: 22 },
      { month: "Okt", value: 27 },
      { month: "Nov", value: 35 },
      { month: "Des", value: 40 },
    ];

    // Set data to xAxis
    xAxis.data.setAll(lineChartData);

    // Create gradient for fill
    let gradient = am5.LinearGradient.new(lineChartRoot, {
      stops: [
        { color: am5.color("#9DA6FE"), opacity: 0.8 },
        { color: am5.color("#9DA6FE"), opacity: 0.1 }
      ],
      rotation: 90
    });

    // Create series
    let series = lineChart.series.push(
      am5xy.SmoothedXLineSeries.new(lineChartRoot, {
        name: "Pendapatan",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "month",
        tooltip: am5.Tooltip.new(lineChartRoot, {
          labelText: "{valueY} juta",
          pointerOrientation: "horizontal",
        }),
        tension: 0.3, // Decreased tension for smoother curves
      })
    );

    // Configure the stroke (line)
    series.strokes.template.setAll({
      stroke: am5.color("#717FFE"),
      strokeWidth: 2
    });

    // Enable fill for the line series
    series.fills.template.setAll({
      visible: true,
      fillGradient: gradient,
      fill: am5.color("#D6F0FF")
    });

    // Set data
    series.data.setAll(lineChartData);

    // Add bullets with hover state
    series.bullets.push(function() {
      const circle = am5.Circle.new(lineChartRoot, {
        radius: 5,
        stroke: lineChartRoot.interfaceColors.get("background"),
        strokeWidth: 2,
        fill: am5.color("#717FFE"),
      });
      
      // Add hover state to each individual bullet
      circle.states.create("hover", {
        scale: 1.3
      });
      
      return am5.Bullet.new(lineChartRoot, {
        locationY: 0,
        sprite: circle
      });
    });
    
    // Configure tooltip positioning
    series.get("tooltip").adapters.add("dy", function() {
      return -10;
    });

    // Animate
    series.appear(1000);
    lineChart.appear(1000, 100);
  });


  onCleanup(() => {
    if (pieChartRoot) pieChartRoot.dispose();
    if (lineChartRoot) lineChartRoot.dispose();
  });

  return (
    <MainLayout>
      {
        <div class="p-6 space-y-6">
        {/* Header Selamat Datang */}
        <div class="bg-gradient-to-r from-[#D90000] via-[#904300] to-[#3E00C4] rounded-xl p-6 text-white shadow-md relative overflow-hidden">
          <div class="text-lg mb-2 font-semibold">Rekap Data Jagoan Kos Tahun 2025</div>
          <div class="flex items-center gap-4 text-sm mb-4">
            <select class="bg-white text-black rounded px-2 py-1">
              <option>Februari</option>
            </select>
            <select class="bg-white text-black rounded px-2 py-1">
              <option>2025</option>
            </select>
            <span>• Pemilik: Irfan Satya</span>
          </div>
          <div class="flex gap-6">
            <div>
              <div class="text-2xl font-bold">16</div>
              <div class="text-sm">Total Kamar</div>
            </div>
            <div>
              <div class="text-2xl font-bold">10</div>
              <div class="text-sm">Kamar Terisi</div>
            </div>
            <div>
              <div class="text-2xl font-bold">6</div>
              <div class="text-sm">Kamar Kosong</div>
            </div>
          </div>
          <div class="absolute bottom-4 right-6 text-lg font-bold">Selamat Datang, Irfan</div>
        </div>
  
        {/* Pendapatan & Statistik */}
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-2 bg-white rounded-xl p-4 shadow">
            <div class="flex justify-between items-center mb-2">
              <h2 class="text-lg font-semibold">Pendapatan Tahun ini</h2>
              <span class="text-red-600 font-bold text-xl">Rp 7,400,000.00</span>
            </div>
            <div id="linechartdiv" style="height: 240px;"></div>
          </div>
  
          <div class="flex flex-col justify-between gap-4">
            <div class="bg-white rounded-xl p-4 shadow">
              <h2 class="text-md font-semibold mb-2">Penyewa Kamar</h2>
              <div id="piechartdiv" style="height: 180px;"></div>
            </div>
            <div class="bg-white rounded-xl p-4 shadow text-sm">
              <h2 class="font-semibold mb-1">Sisa Kamar Kosong</h2>
              <div class="flex justify-between">
                <span>2 Tipe A</span>
                <span>1 Tipe B</span>
                <span>3 Tipe C</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Tabel Data */}
        <div class="bg-white p-4 rounded-xl shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Data Pemesan Kamar</h2>
            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + Tambah Data
            </button>
          </div>
          <table class="w-full text-sm border-t">
            <thead>
              <tr class="text-left border-b bg-gray-50">
                <th class="py-2 px-3">No</th>
                <th class="py-2 px-3">Nama Lengkap</th>
                <th class="py-2 px-3">Tgl Pemesanan</th>
                <th class="py-2 px-3">Pekerjaan</th>
                <th class="py-2 px-3">No. Telp</th>
                <th class="py-2 px-3">Tipe Kamar</th>
                <th class="py-2 px-3">Lama Sewa</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["01", "Irfan Satya", "17/02/2025", "Siswa SMA/SMK", "082174971085", "Kamar Tipe A", "Per Bulan"],
                ["02", "Ivo Fadilatushofa", "17/02/2025", "Mahasiswa", "082174971085", "Kamar Tipe B", "Per Bulan"],
                ["03", "Izzat Mumtaz", "17/02/2025", "Siswa SMA/SMK", "082174971085", "Kamar Tipe A", "Per Bulan"],
                ["04", "Hanum Fadiyanti", "17/02/2025", "Siswa SMA/SMK", "082174971085", "Kamar Tipe B", "Per Bulan"],
                ["05", "Kevin Resha", "17/02/2025", "Mahasiswa", "082174971085", "Kamar Tipe A", "Per Bulan"],
              ].map(([no, nama, tgl, pekerjaan, telp, tipe, lama]) => (
                <tr class="border-b hover:bg-gray-50">
                  <td class="py-2 px-3">{no}</td>
                  <td class="py-2 px-3">{nama}</td>
                  <td class="py-2 px-3">{tgl}</td>
                  <td class="py-2 px-3">{pekerjaan}</td>
                  <td class="py-2 px-3">{telp}</td>
                  <td class="py-2 px-3">{tipe}</td>
                  <td class="py-2 px-3">{lama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      }
    </MainLayout>
    
  );
};

export default Dashboard;
