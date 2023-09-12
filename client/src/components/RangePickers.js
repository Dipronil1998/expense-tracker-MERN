import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const RangePickers = () => {
 return <Space direction="vertical" size={12}>
    <RangePicker 
    allowClear={false}
    />
  </Space>
};
export default RangePickers;