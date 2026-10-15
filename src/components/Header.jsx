import React, { useState } from "react";
import Icon from "./Icon.jsx";
import { groupCards, units, serviceLinks } from "../data/siteData.js";

function Logo(){return <a className="logo" href="/#top" aria-label="Godwin Groups home"><img src="/images/logo.png" alt="Godwin Groups"/></a>}
const groupMenu=[
 {title:"Godwin ITS",items:groupCards[0].items},
 {title:"Godwin Industries",units},
 {title:"Godwin Heavy Fabrications",items:groupCards[1].items},
 {title:"Godwin MEP Services",items:groupCards[2].items},
 {title:"Godwin Electricals",items:groupCards[3].items},
 {title:"Powerplant Engineering Services",items:groupCards[4].items},
 {title:"Godwin Global Technologies",items:groupCards[5].items}
];
function Header(){
 const [menu,setMenu]=useState(false);
 const [openDropdown,setOpenDropdown]=useState(null);
 const [activeGroup,setActiveGroup]=useState(null);
 const [activeUnit,setActiveUnit]=useState(null);
 const closeDropdown=()=>{setOpenDropdown(null);setActiveGroup(null);setActiveUnit(null);setMenu(false)};
 const toggleDropdown=(name)=>{setOpenDropdown(current=>current===name?null:name);setActiveGroup(null);setActiveUnit(null)};
 const openDropdownOnClick=(name,event)=>{if(event.nativeEvent.pointerType==="mouse"){setOpenDropdown(name);setActiveGroup(null);setActiveUnit(null)}else{toggleDropdown(name)}};
 const openGroupOnClick=(name,event)=>{if(event.nativeEvent.pointerType==="mouse"||event.detail===0){setActiveGroup(name)}else{setActiveGroup(activeGroup===name?null:name)}};
 const openUnitOnClick=(name,event)=>{if(event.nativeEvent.pointerType==="mouse"||event.detail===0){setActiveUnit(name)}else{setActiveUnit(activeUnit===name?null:name)}};
 const openOnHover=(name,event)=>{if(event.pointerType==="mouse"){setOpenDropdown(name);setActiveGroup(null);setActiveUnit(null)}};
 const closeOnLeave=(event)=>{if(event.pointerType==="mouse"){setOpenDropdown(null);setActiveGroup(null);setActiveUnit(null)}};
 return <header className="header">
  <a className="skip-link" href="#main-content">Skip to main content</a>
  <div className="top-strip"><div className="top-inner"><b>Established by "IIT" Professionals</b><div className="top-contact"><a href="tel:+919010162657"><Icon name="phone" size={15}/>+91 9010162657</a><a href="mailto:info@godwin.co.in"><Icon name="mail" size={15}/>info@godwin.co.in</a><div className="social"><a aria-label="Facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer"><Icon name="facebook"/></a><a aria-label="Instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Icon name="instagram"/></a><a aria-label="YouTube" href="https://www.youtube.com/" target="_blank" rel="noreferrer"><Icon name="youtube"/></a><span aria-hidden="true"><Icon name="settings"/></span></div></div></div></div>
  <div className="nav-row"><div className="nav-inner"><Logo/><button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}><Icon name={menu?"close":"menu"} size={25}/></button>
   <nav className={menu?"main-nav open":"main-nav"} aria-label="Main navigation">
    <a href="/#top" onClick={closeDropdown}>Home</a>
    <div className={"nav-drop "+(openDropdown==="groups"?"is-open":"")} onPointerEnter={event=>openOnHover("groups",event)} onPointerLeave={closeOnLeave}>
     <button className="nav-trigger" aria-haspopup="true" aria-expanded={openDropdown==="groups"} onClick={event=>openDropdownOnClick("groups",event)}>Groups<span className="nav-chevron"><Icon name={openDropdown==="groups"?"chevron-up":"chevron-down"} size={14}/></span></button>
     <div className="drop-menu groups-menu">{groupMenu.map(category=><div className={"drop-category "+(category.units?"industries-category ":"")+(activeGroup===category.title?"expanded":"")} key={category.title} onPointerEnter={event=>{if(event.pointerType==="mouse"){setActiveGroup(category.title);setActiveUnit(null)}}}>
      <button aria-haspopup="true" aria-expanded={activeGroup===category.title} onFocus={event=>{if(event.currentTarget.matches(":focus-visible")){setActiveGroup(category.title);setActiveUnit(null)}}} onClick={event=>openGroupOnClick(category.title,event)}><span>{category.title}</span><span className="category-chevron"><Icon name="arrow-right" size={16}/></span></button>
      <div className="submenu">{category.units ? category.units.map(([unit,items])=>{
       const unitKey=`${category.title}:${unit}`;
       return <div className={"drop-category unit-category "+(activeUnit===unitKey?"expanded":"")} key={unit} onPointerEnter={event=>{if(event.pointerType==="mouse")setActiveUnit(unitKey)}}>
        <button aria-haspopup="true" aria-expanded={activeUnit===unitKey} onFocus={event=>{if(event.currentTarget.matches(":focus-visible")){setActiveUnit(unitKey)}}} onClick={event=>openUnitOnClick(unitKey,event)}><span>{unit.replace("UNIT - ","Unit - ")}</span><span className="category-chevron"><Icon name="arrow-right" size={15}/></span></button>
        <div className="submenu unit-submenu">{items.map(item=><a href={serviceLinks[item]} onClick={closeDropdown} key={item}>{item}</a>)}</div>
       </div>;
      }) : category.items.map(item=><a href={serviceLinks[item]||("/services/"+item.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))} onClick={closeDropdown} key={item}>{item}</a>)}</div>
     </div>)}</div>
    </div>
    <div className={"nav-drop "+(openDropdown==="about"?"is-open":"")} onPointerEnter={event=>openOnHover("about",event)} onPointerLeave={closeOnLeave}>
     <button className="nav-trigger" aria-haspopup="true" aria-expanded={openDropdown==="about"} onClick={event=>openDropdownOnClick("about",event)}>About Us<span className="nav-chevron"><Icon name={openDropdown==="about"?"chevron-up":"chevron-down"} size={14}/></span></button>
     <div className="drop-menu about-menu"><a href="/about-us" onClick={closeDropdown}>About Us</a><a href="/our-organization" onClick={closeDropdown}>Our Organization</a><a href="/flowchart1" onClick={closeDropdown}>Group Flowchart</a></div>
    </div>
    <a href="/clients" onClick={closeDropdown}>Clients</a><a className="contact-button" href="/contact-us" onClick={closeDropdown}>Contact Us</a>
   </nav>
  </div></div>
 </header>
}

export default Header;
