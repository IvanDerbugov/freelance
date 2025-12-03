import textureImage from 'figma:asset/63756a8a22e792c278d3201662f2c6d72dc480fa.png';

export function NoiseTexture() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-[1] opacity-50"
      style={{
        backgroundImage: `url(${textureImage})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        mixBlendMode: 'overlay',
      }}
    />
  );
}
