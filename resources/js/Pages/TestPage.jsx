import MainLayout from '@/Layouts/MainLayout'
import React from 'react'

const TestPage = (props) => {
  let price = 300.00;
  let discount = 10;

  return (
    <MainLayout {...props}>
      Final Price : {price - price * (discount * 0.01)}<br/>
      Final Price : {price * (1 - (discount / 100))}
    </MainLayout>
  )
}

export default TestPage
