import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";

const TheHeaderDropdown = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");

    history.push("/login");
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src="https://www.gravatar.com/avatar?s=200&d=mp"
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Configuraciones</strong>
        </CDropdownItem> */}
        <CDropdownItem onClick={(_) => history.push("/perfil")}>
          <CIcon name="cil-user" className="mfe-2" />
          Perfil
        </CDropdownItem>
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-power-standby" className="mfe-2" />
          Cerrar sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
