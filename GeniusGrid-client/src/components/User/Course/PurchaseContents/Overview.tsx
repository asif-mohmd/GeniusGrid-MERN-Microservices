

interface PurchaseContentsProps {
  selectedVideoDescription: string | null
}


const Overview: React.FC<PurchaseContentsProps> =({selectedVideoDescription}) =>{
  return (
    <div>{selectedVideoDescription}</div>
  )
}

export default Overview