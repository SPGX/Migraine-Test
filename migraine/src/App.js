/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import api from './api/api'
import moment from 'moment'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function App() {
  const [migraine, setMigraine] = useState([])
  const [migraine90, setMigraine90] = useState([])
  const [migraine180, setMigraine180] = useState([])
  const [isButton, setIsButton] = useState(1)
  const [mood0, setMood0] = useState(0)
  const [mood1, setMood1] = useState(0)
  const [mood2, setMood2] = useState(0)
  const [mood3, setMood3] = useState(0)

  useEffect(() => {
    getData()
    MathData()
  }, [isButton])

  const getData = async () => {
    const days = await api.get30()
    setMigraine(days?.data?.data)
    if (isButton === 1) {
      const level0 = days?.data?.data.filter(item => item?.headache_score === 0)
      setMood0(level0.length)
      const level1 = days?.data?.data.filter(item => item?.headache_score === 1)
      setMood1(level1.length)
      const level2 = days?.data?.data.filter(item => item?.headache_score === 2)
      setMood2(level2.length)
      const level3 = days?.data?.data.filter(item => item?.headache_score === 3)
      setMood3(level3.length)
    }

    const days90 = await api.get90()
    setMigraine90(days90?.data?.data)
    if (isButton === 2) {
      const level00 = migraine90.filter(item => item?.headache_score === 0)
      setMood0(level00.length)
      const level11 = migraine90.filter(item => item?.headache_score === 1)
      setMood1(level11.length)
      const level22 = migraine90.filter(item => item?.headache_score === 2)
      setMood2(level22.length)
      const level33 = migraine90.filter(item => item?.headache_score === 3)
      setMood3(level33.length)
    }

    const days180 = await api.get180()
    setMigraine180(days180?.data?.data)
    if (isButton === 3) {
      const level000 = days180?.data?.data.filter(item => item?.headache_score === 0)
      setMood0(level000.length)
      const level111 = days180?.data?.data.filter(item => item?.headache_score === 1)
      setMood1(level111.length)
      const level222 = days180?.data?.data.filter(item => item?.headache_score === 2)
      setMood2(level222.length)
      const level333 = days180?.data?.data.filter(item => item?.headache_score === 3)
      setMood3(level333.length)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MathData = () => {
    const data = migraine.map(item => item.headache_score)
    return data
  }

  const checkMonth = () => {
    if (isButton === 1) {
      return migraine.map(item => item?.headache_score)
    }
    if (isButton === 2) {
      return migraine90.map(item => item?.headache_score)
    }
    if (isButton === 3) {
      return migraine180.map(item => item?.headache_score)
    }
  }

  const checkLabels = () => {
    // if (isButton === 1) {
      if (isButton === 1) {
        return migraine.map(item => item?.headache_score_date.slice(8, 10))
      }
      if (isButton === 2) {
        return migraine90.map(item => item?.headache_score_date.slice(8, 10))
      }
      if (isButton === 3) {
        return migraine180.map(item => item?.headache_score_date.slice(8, 10))
      }
    // }

    // if (isButton === 2) {
    //   const months = migraine90.map(item => item?.headache_score_date.slice(5, 7).replace(/^0+/, ''))
    //   const math = [...new Set(months)]
    //   const result = math.map(e => moment(e).format('MMM'))
    //   return result
    // }

    // if (isButton === 3) {
    //   const months = migraine180.map(item => item?.headache_score_date.slice(5, 7).replace(/^0+/, ''))
    //   const math = [...new Set(months)]
    //   const result = math.map(e => moment(e).format('MMM'))
    //   return result
    // }
  }

  const getDays = () => {
    if (isButton === 1) {
      return migraine.length
    }
    if (isButton === 2) {
      return migraine90.length
    }
    if (isButton === 3) {
      return migraine180.length
    }
  }
  const startMonth = () => {
    if (isButton === 1) {
      return moment(migraine[0]?.headache_score_date).format('LL')
    }
    if (isButton === 2) {
      return moment(migraine90[0]?.headache_score_date).format('LL')
    }
    if (isButton === 3) {
      return moment(migraine180[0]?.headache_score_date).format('LL')
    }
  }

  const endMonth = () => {
    if (isButton === 1) {
      const data = migraine[migraine?.length - 1]
      const result = moment(data?.headache_score_date).format('LL')
      return result
    }
    if (isButton === 2) {
      const data = migraine90[migraine90?.length - 1]
      const result = moment(data?.headache_score_date).format('LL')
      return result
    }
    if (isButton === 3) {
      const data = migraine180[migraine180?.length - 1]
      const result = moment(data?.headache_score_date).format('LL')
      return result
    }
  }

  const Button = [
    { id: 1, title: '1 เดือน' },
    { id: 2, title: '3 เดือน' },
    { id: 3, title: '6 เดือน' },
  ]

  const data = {
    labels: checkLabels(),
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 8,
        minBarLength: 2,
        label: 'ระดับความปวด',
        data: checkMonth(),
        backgroundColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  }

  // const data90 = {
  //   labels: checkLabels(),
  //   datasets: [
  //     {
  //       label: 'ระดับความปวด',
  //       data: [1, 2, 3, 4, 5, 6],
  //       backgroundColor: ['rgba(75, 192, 192, 1)'],
  //       borderWidth: 1,
  //     },
  //   ],
  // }

  // const data180 = {
  //   labels: checkLabels(),
  //   datasets: [
  //     {
  //       label: 'ระดับความปวด',
  //       data: [1, 2, 3, 4, 5, 6, 10, 12, 13],
  //       backgroundColor: ['rgba(75, 192, 192, 1)'],
  //       borderWidth: 1,
  //     },
  //   ],
  // }

  const options = {
    scales: {
      x: {
        grid: {
          offset: true,
        },
      },
    },
  }

  const LevelData = [
    {
      level: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Smile_Image.png',
      color: 'rgba(12, 139, 74, 1)',
      value: mood0,
    },
    {
      level: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Smile_Image.png',
      color: 'rgba(0, 76, 146, 1)',
      value: mood1,
    },
    {
      level: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Smile_Image.png',
      color: 'rgba(255, 218, 112, 1)',
      value: mood2,
    },
    {
      level: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Smile_Image.png',
      color: 'rgba(144, 47, 0, 1)',
      value: mood3,
    },
  ]

  const Level = () => {
    return (
      <>
        {LevelData.map((item, index) => (
          <>
            <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <div>
                <img src={item?.level} width='20px' style={{ backgroundColor: item?.color, borderRadius: 50 }} />
              </div>
              <div>{item?.value}</div>
            </div>
          </>
        ))}
      </>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
      }}
    >
      <div style={{ width: '500px', height: '500px', position: 'relative' }}>
        {/* emotion */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {Level()}
        </div>

        <div style={{ fontWeight: 'bold' }}>ปวดไมเกรน {getDays()} วัน</div>
        <div style={{ fontWeight: 'bold' }}>
          {startMonth()} - {endMonth()}
        </div>
        <Bar
          data={data}
          // data={(isButton === 1 && data) || (isButton === 2 && data90) || (isButton === 3 && data180)}
          options={options}
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {Button.map((item, index) => (
            <>
              <div
                onClick={() => setIsButton(item?.id)}
                style={{
                  paddingLeft: '30px',
                  paddingRight: '30px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  borderRadius: 5,
                  color: isButton === item?.id ? '#fff' : 'grey',
                  backgroundColor: isButton === item?.id ? '#10C45F' : '#fff',
                  border: isButton !== item?.id && '1px solid grey',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
                key={index}
              >
                {item.title}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
