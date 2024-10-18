import IntersectionContainer from '@monitor-fe/react/src/IntersectionContainer.tsx'

const ExposeDemo = () => {
  return (
    <div>
      <div style={{ height: 2000 }}>
        Placeholder
      </div>
      <IntersectionContainer
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'pink',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        box
      </IntersectionContainer>
    </div>
  )
}

export default ExposeDemo
