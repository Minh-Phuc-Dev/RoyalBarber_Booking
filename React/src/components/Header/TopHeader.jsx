import { useSettings } from "@src/hooks/UseSettings";
import { Clock, MapPin, Phone } from "lucide-react";
import { Navigate } from "react-router-dom";

function TopHeader() {
    const { settings, loading } = useSettings();

    return (
        <div className="bg-secondary-800 text-white py-2 px-4 hidden md:block">
            <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
                <div className="flex items-center space-x-6 ml-10">
                    <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        {
                            loading ? null : <span>{settings.phone}</span>
                        }
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        {
                            loading ? null : <span>{settings.weekdays} (T2 - T6)</span>
                        }
                        {
                            loading ? null : <span>| {settings.weekend} (T7 - CN)</span>
                        }
                    </div>
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        {
                            loading ? null : <span>{settings.address}</span>
                        }
                    </div>
                </div>
            </div>
            {
                settings?.maintenanceMode ? (
                    <Navigate to="/maintenance" />
                ) : null
            }
        </div>
    )
}

export default TopHeader