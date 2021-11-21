import React from 'react'
import { Link } from 'react-router-dom'

import {
  CBadge,
  CButton,
  CDataTable,
  CLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ListPromotions = ({ user }) => {
  const usersData = [
    {
      id: 0,
      employee: 'John Doe',
      type: 'Manager',
      post: 'Manger',
      organization: 'Copil',
    },
    {
      id: 0,
      employee: 'Ali',
      type: 'Manager',
      post: 'Manger',
      organization: 'Copil',
    },
  ]
  const fields = [
    { key: 'employee', _style: { width: '20%' } },
    { key: 'type', _style: { width: '20%' } },
    'post',
    { key: 'organization', _style: { width: '30%' } },
    {
      key: 'action',
      label: 'Action',
      _style: { width: '10%' },
      sorter: false,
      filter: false,
    },
  ]
  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }

  return (
    <div>
      <CLabel htmlFor="select">All Promotions </CLabel>

      <div style={{ float: 'right', marginBottom: 30 }}>
        <Link to="/HR/AddPromotion">
          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            onClick={() => {}}
          >
            Add Promotion
          </CButton>
        </Link>
      </div>

      <CDataTable
        items={usersData}
        fields={fields}
        columnFilter
        footer
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          image: (item) => (
            <img
              alt={item.employee}
              src={item.image}
              width={150}
              height={100}
              style={{ padding: 10 }}
            />
          ),
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)} alt="hello">
                {item.status}
              </CBadge>
            </td>
          ),
          action: (item, index) => {
            return (
              <td className="py-2">
                <CDropdown className="m-1">
                  <CDropdownToggle>
                    <CIcon name="cil-settings" alt="CoreUI Icons Settings" />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>Update</CDropdownItem>
                    <CDropdownItem>Delete</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            )
          },
        }}
      />
    </div>
  )
}

export default ListPromotions
