import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';

const FinalBusinessReport = () => {
  const [activeTab, setActiveTab] = useState('campHost');

  // 月份資料
  const months = ["五月", "六月", "七月", "八月", "九月", "十月", "十一月"];
  
  // 各類資料
  const campHostData = {
    revenue: [372095, 2115170, 3469939, 3469939, 3469939, 2607814, 2607814],
    profit: [90715, 530904, 793597, 793597, 793597, 626429, 626429],
    costs: {
      roomCost: [119280, 663600, 1144080, 1144080, 1144080, 838320, 838320],
      otherCosts: [144403, 819056, 1369452, 1369452, 1369452, 1019200, 1019200],
      royalty: [17697, 101610, 162810, 162810, 162810, 123865, 123865]
    },
    marginRate: [24.38, 25.10, 22.87, 22.87, 22.87, 24.02, 24.02]
  };
  
  const jingshanData = {
    roomRevenue: [119280, 663600, 1144080, 1144080, 1144080, 838320, 838320],
    royalty: [17697, 101610, 162810, 162810, 162810, 123865, 123865],
    total: [136977, 765210, 1306890, 1306890, 1306890, 962185, 962185]
  };
  
  const chanseData = {
    revenue: [57225, 334320, 546840, 546840, 546840, 411600, 411600]
  };
  
  // 營收與利潤趨勢資料
  const revenueAndProfitData = months.map((month, index) => ({
    name: month,
    營業額: campHostData.revenue[index],
    利潤: campHostData.profit[index],
    毛利率: campHostData.marginRate[index]
  }));
  
  // 房東收益資料
  const jingshanIncomeData = months.map((month, index) => ({
    name: month,
    房間收益: jingshanData.roomRevenue[index],
    權利金: jingshanData.royalty[index],
    總收益: jingshanData.total[index]
  }));
  
  // 蟬說收益資料
  const chanseIncomeData = months.map((month, index) => ({
    name: month,
    KOL抽成收益: chanseData.revenue[index]
  }));
  
  // 單位成本與利潤分析
  const unitCostData = [
    { name: '平日日間', 房間成本: 1000, KOL抽成: 450, 食材成本: 375, 耗損: 80, 數位廣告: 150, 稅: 150, 菁山權利金: 139.93, 利潤: 654.07 },
    { name: '假日日間', 房間成本: 1400, KOL抽成: 600, 食材成本: 375, 耗損: 80, 數位廣告: 200, 稅: 200, 菁山權利金: 146.93, 利潤: 497.07 },
    { name: '平日晚間', 房間成本: 1300, KOL抽成: 600, 食材成本: 450, 耗損: 90, 數位廣告: 200, 稅: 200, 菁山權利金: 188.93, 利潤: 970.07 },
    { name: '假日晚間', 房間成本: 1600, KOL抽成: 1050, 食材成本: 450, 耗損: 90, 數位廣告: 350, 稅: 350, 菁山權利金: 314.93, 利潤: 1894.07 }
  ];
  
  // 成本結構分析
  const costStructureData = [
    { name: '房間採購成本', value: 5891760 },
    { name: '菁山權利金', value: 855467 },
    { name: 'KOL抽成', value: 2855265 },
    { name: '食材成本', value: 1884000 },
    { name: '耗損', value: 400800 },
    { name: '數位廣告', value: 1220000 },
    { name: '稅', value: 1220000 }
  ];
  
  // 總體成本結構
  const monthlyCostData = months.map((month, index) => ({
    name: month,
    房間採購成本: campHostData.costs.roomCost[index],
    其他基本成本: campHostData.costs.otherCosts[index],
    菁山權利金: campHostData.costs.royalty[index]
  }));

  // 圖表顏色集
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];
  
  // 千位數格式化
  const formatThousands = (value) => {
    return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}元`;
  };

  // 營業額與利潤圖表
  const renderCampHostRevenueProfit = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">露營主報表 - 營業額與利潤趨勢</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={revenueAndProfitData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" label={{ value: '金額 (元)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: '毛利率 (%)', angle: 90, position: 'insideRight' }} />
          <Tooltip formatter={(value, name) => {
            if (name === '毛利率') return [`${value.toFixed(2)}%`, name];
            return [formatThousands(value), name];
          }} />
          <Legend />
          <Area yAxisId="left" type="monotone" dataKey="營業額" fill="#8884d8" stroke="#8884d8" />
          <Bar yAxisId="left" dataKey="利潤" barSize={30} fill="#82ca9d" />
          <Line yAxisId="right" type="monotone" dataKey="毛利率" stroke="#ff7300" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );

  // 月度成本結構
  const renderCampHostCostStructure = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">露營主報表 - 月度成本結構</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={monthlyCostData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatThousands(value)} />
          <Legend />
          <Bar dataKey="房間採購成本" stackId="a" fill="#8884d8" />
          <Bar dataKey="其他基本成本" stackId="a" fill="#82ca9d" />
          <Bar dataKey="菁山權利金" stackId="a" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // 單位成本與利潤分析
  const renderUnitCostAnalysis = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">露營主報表 - 單位成本與利潤分析</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={unitCostData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip formatter={(value) => `${value}元`} />
          <Legend />
          <Bar dataKey="房間成本" stackId="a" fill="#8884d8" />
          <Bar dataKey="KOL抽成" stackId="a" fill="#82ca9d" />
          <Bar dataKey="食材成本" stackId="a" fill="#ffc658" />
          <Bar dataKey="耗損" stackId="a" fill="#FF8042" />
          <Bar dataKey="數位廣告" stackId="a" fill="#00C49F" />
          <Bar dataKey="稅" stackId="a" fill="#FFBB28" />
          <Bar dataKey="菁山權利金" stackId="a" fill="#0088FE" />
          <Bar dataKey="利潤" stackId="a" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // 菁山房東收益趨勢
  const renderJingshanIncomeTrend = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">菁山房東報表 - 收益趨勢</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={jingshanIncomeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: '金額 (元)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => formatThousands(value)} />
          <Legend />
          <Line type="monotone" dataKey="房間收益" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="權利金" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="總收益" stroke="#ff7300" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  // 菁山房東收益組成
  const renderJingshanIncomeComposition = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">菁山房東報表 - 收益組成</h2>
      <div className="flex">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={[
                  { name: '房間採購收益', value: 5891760 },
                  { name: '權利金收益', value: 855467 }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {[0, 1].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatThousands(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">總房間採購收益</h3>
            <p className="text-2xl font-bold">5,891,760元</p>
          </div>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">總權利金收益</h3>
            <p className="text-2xl font-bold">855,467元</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">總收益</h3>
            <p className="text-2xl font-bold">6,747,227元</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 蟬說系統商收益趨勢
  const renderChanseIncomeTrend = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">蟬說系統商報表 - 收益趨勢</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chanseIncomeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: '金額 (元)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => formatThousands(value)} />
          <Legend />
          <Bar dataKey="KOL抽成收益" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // 蟬說系統商佔比
  const renderChanseCostProportion = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">蟬說系統商報表 - 佔總成本比例</h2>
      <div className="flex">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={[
                  { name: 'KOL抽成收益', value: 2855265 },
                  { name: '其他成本', value: 11002177 }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                <Cell fill="#8884d8" />
                <Cell fill="#e0e0e0" />
              </Pie>
              <Tooltip formatter={(value) => formatThousands(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">蟬說系統商總收益</h3>
            <p className="text-2xl font-bold">2,855,265元</p>
          </div>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">佔總成本比例</h3>
            <p className="text-2xl font-bold">20.60%</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 總結比較圖表
  const renderTotalComparison = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">各方收益比較</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={[
            { name: '露營主利潤', value: 4255269 },
            { name: '菁山房東收益', value: 6747227 },
            { name: '蟬說系統商收益', value: 2855265 }
          ]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatThousands(value)} />
          <Bar dataKey="value" fill="#8884d8">
            {[0, 1, 2].map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderCampHostContent = () => (
    <div className="flex flex-col gap-6">
      {renderCampHostRevenueProfit()}
      {renderCampHostCostStructure()}
      {renderUnitCostAnalysis()}
    </div>
  );

  const renderJingshanContent = () => (
    <div className="flex flex-col gap-6">
      {renderJingshanIncomeTrend()}
      {renderJingshanIncomeComposition()}
    </div>
  );

  const renderChanseContent = () => (
    <div className="flex flex-col gap-6">
      {renderChanseIncomeTrend()}
      {renderChanseCostProportion()}
    </div>
  );

  const renderSummaryContent = () => (
    <div className="flex flex-col gap-6">
      {renderTotalComparison()}
      {renderCampHostRevenueProfit()}
      {renderJingshanIncomeTrend()}
      {renderChanseIncomeTrend()}
    </div>
  );

  // Tab 按鈕樣式
  const getTabStyle = (tab) => {
    return `px-4 py-2 font-medium rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
  };

  return (
    <div className="flex flex-col w-full p-4 gap-6">
      <h1 className="text-2xl font-bold text-center">草山夏季野餐冰茶體驗商業計畫視覺化分析</h1>
      
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => setActiveTab('campHost')} className={getTabStyle('campHost')}>
          露營主報表
        </button>
        <button onClick={() => setActiveTab('jingshan')} className={getTabStyle('jingshan')}>
          菁山房東報表
        </button>
        <button onClick={() => setActiveTab('chanse')} className={getTabStyle('chanse')}>
          蟬說系統商報表
        </button>
        <button onClick={() => setActiveTab('summary')} className={getTabStyle('summary')}>
          總結比較
        </button>
      </div>
      
      {activeTab === 'campHost' && renderCampHostContent()}
      {activeTab === 'jingshan' && renderJingshanContent()}
      {activeTab === 'chanse' && renderChanseContent()}
      {activeTab === 'summary' && renderSummaryContent()}
    </div>
  );
};

export default FinalBusinessReport;