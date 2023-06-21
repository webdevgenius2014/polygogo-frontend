import '../RoundCheckbox/RoundCheckbox.scss'

type Props={
    checked:boolean; 
    onChange: (val:any)=>void;
};

const RoundCheckbox: React.FC<Props>=({checked, onChange})=>{
    return (<div className="Checkbox">
    <input type="checkbox" checked={checked} onChange={onChange}/>
    <div className="Checkbox-visible"></div>
  </div>)
}

export default RoundCheckbox;