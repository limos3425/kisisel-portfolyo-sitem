const AnimatedBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div className="absolute w-[200%] h-[200%] bg-gradient-to-br from-purple-900/50 via-black to-pink-900/30 animate-gradient-move" />
    </div>
  )
}

export default AnimatedBackground
