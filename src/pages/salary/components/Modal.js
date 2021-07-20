import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  Cascader,
  Row,
  Divider,
  Col,
  Space,
  DatePicker,
  Select,
} from 'antd'
import { Trans } from '@lingui/macro'
import city from 'utils/city'
import { t } from '@lingui/macro'
import locale from 'antd/es/date-picker/locale/vi_VN'
import moment from 'moment'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
}

class SalaryModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          key: item.key,
        }
        onOk(data)
      })
      .catch((errorInfo) => {
        console.log(errorInfo)
      })
  }

  render() {
    console.log('locale', locale)
    const { item = {}, onOk, form, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" layout="horizontal">
          <FormItem
            name="month_date"
            rules={[{ required: true }]}
            label={'Thời gian'}
            hasFeedback
            initialValue={moment().subtract(1, 'month')}
          >
            <DatePicker
              locale={locale}
              style={{ width: '100%' }}
              picker="month"
              format={(value) => `Tháng ${value.format('MM/YYYY')}`}
            />
          </FormItem>
          <Divider orientation="left">Giới hạn</Divider>
          <Row>
            <Col span={12}>
              <FormItem
                name="limit_late_in"
                rules={[{ required: true }]}
                label={'Đi trễ (phút)'}
                hasFeedback
                {...formItemLayout}
                initialValue={0}
              >
                <InputNumber />
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                name="limit_soon_out"
                rules={[{ required: true }]}
                label={'Về sớm (phút)'}
                hasFeedback
                initialValue={0}
                {...formItemLayout}
              >
                <InputNumber min={0} defaultValue={0} />
              </FormItem>
            </Col>
          </Row>

          <Divider orientation="left">Trừ lương </Divider>
          <Row gutter={20}>
            <Col span={12}>
              <FormItem
                name="minute_sub"
                rules={[{ required: true }]}
                label={'Thời gian (phút)'}
                hasFeedback
                initialValue={0}
                {...formItemLayout}
              >
                <InputNumber defaultValue={0} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name="minute_sub_value"
                rules={[{ required: true }]}
                label={'Só tiên (VNĐ)'}
                hasFeedback
                initialValue={0}
                {...formItemLayout}
              >
                <InputNumber defaultValue={0} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

SalaryModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default SalaryModal
