import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ServiceOption {
  id: string;
  name: string;
  duration: string;
  price: string;
  selected: boolean;
}

interface LocationOption {
  id: string;
  name: string;
  address: string;
  selected: boolean;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  selected: boolean;
}

export default function TrainerBooking() {
  const [services, setServices] = useState<ServiceOption[]>([
    {
      id: "1",
      name: "Инструктаж в тренажёрном зале",
      duration: "30 мин",
      price: "3 000",
      selected: false,
    },
    {
      id: "2",
      name: "Инструктаж в тренажёрном зале",
      duration: "30 мин",
      price: "3 000",
      selected: true,
    },
    {
      id: "3",
      name: "Инструктаж в тренажёрном зале",
      duration: "30 мин",
      price: "3 000",
      selected: false,
    },
    {
      id: "4",
      name: "Инструктаж в тренажёрном зале",
      duration: "30 мин",
      price: "3 000",
      selected: false,
    },
  ]);

  const [locations, setLocations] = useState<LocationOption[]>([
    {
      id: "1",
      name: "World Class",
      address: "г.Москва, у��. Тверская 32",
      selected: true,
    },
    {
      id: "2",
      name: "Зебра",
      address: "г.Москва, ул. Школьная 21",
      selected: false,
    },
    {
      id: "3",
      name: "DDX",
      address: "г.Москва, ул. Школьная 21",
      selected: false,
    },
    {
      id: "4",
      name: "World Class",
      address: "г.Москва, ул. Школьная 21",
      selected: false,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(3);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", time: "9:00", available: false, selected: false },
    { id: "2", time: "9:30", available: false, selected: false },
    { id: "3", time: "10:00", available: true, selected: false },
    { id: "4", time: "10:30", available: true, selected: true },
    { id: "5", time: "11:00", available: true, selected: false },
    { id: "6", time: "11:30", available: true, selected: false },
    { id: "7", time: "12:00", available: true, selected: false },
    { id: "8", time: "12:30", available: true, selected: false },
    { id: "9", time: "13:00", available: true, selected: false },
    { id: "10", time: "13:30", available: true, selected: false },
    { id: "11", time: "14:00", available: true, selected: false },
    { id: "12", time: "14:30", available: true, selected: false },
    { id: "13", time: "15:00", available: true, selected: false },
    { id: "14", time: "15:30", available: true, selected: false },
    { id: "15", time: "15:00", available: true, selected: false },
    { id: "16", time: "15:30", available: true, selected: false },
  ]);

  const toggleService = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, selected: !service.selected }
          : service,
      ),
    );
  };

  const selectLocation = (id: string) => {
    setLocations(
      locations.map((location) => ({
        ...location,
        selected: location.id === id,
      })),
    );
  };

  const selectTimeSlot = (id: string) => {
    setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        selected: slot.id === id && slot.available,
      })),
    );
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header with trainer info */}
      <div className="relative h-[580px] overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-accent-primary to-accent-secondary"
          style={{
            background:
              "linear-gradient(180deg, #0047ED 36.15%, #002887 147.81%)",
          }}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.01) 12%, rgba(0, 0, 0, 0.13) 46%, rgba(0, 0, 0, 0.68) 100%)",
          }}
        />

        {/* Background decorative images */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6950c77076262eff289e7765c5edd76f498dd95c?width=1440"
          alt=""
          className="absolute -left-[361px] -top-[60px] w-[720px] h-[720px] opacity-50 transform rotate-[10deg]"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/7ac386323568972b52e277a7a368bbd00c9cb449?width=1200"
          alt=""
          className="absolute right-0 top-0 w-[600px] h-[600px] opacity-50"
        />

        {/* Language selector */}
        <div className="absolute top-10 right-8 lg:right-20">
          <div className="flex items-center gap-3 bg-gray-100 rounded-3xl px-5 py-4 shadow-lg">
            <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path
                  d="M21.8 40.9999C11.1961 40.9999 2.6 32.4037 2.6 21.7999C2.6 11.196 11.1961 2.59985 21.8 2.59985C32.4039 2.59985 41 11.196 41 21.7999C41 32.4037 32.4039 40.9999 21.8 40.9999Z"
                  fill="#0052B5"
                />
                <path
                  d="M39.7908 15.0799C37.0668 7.79025 30.0393 2.59985 21.7996 2.59985C13.5599 2.59985 6.53244 7.79025 3.80847 15.0799L39.7908 15.0799Z"
                  fill="white"
                />
                <path
                  d="M3.80957 28.5198C6.53354 35.8094 13.561 40.9998 21.8007 40.9998C30.0405 40.9998 37.0679 35.8094 39.7919 28.5198L3.80957 28.5198Z"
                  fill="#D90026"
                />
              </svg>
            </div>
            <span className="text-content-primary text-lg font-medium">
              Rus
            </span>
            <svg
              className="w-5 h-5 text-content-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Trainer info */}
        <div className="absolute bottom-20 left-8 lg:left-80 flex items-center gap-8">
          {/* Profile picture */}
          <div className="w-[168px] h-[168px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/d9b62a20c720da0c271ee07e8d57b547884a3da7?width=336"
              alt="Петров Александр"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Trainer details */}
          <div className="text-white font-sf-pro">
            <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Петров Александр
            </h1>
            <p className="text-2xl lg:text-3xl font-normal opacity-90 leading-tight">
              Персональный тренер
            </p>
          </div>
        </div>
      </div>

      {/* Main content sections */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8 -mt-20 relative z-10">
        {/* Services Section */}
        <ServicesSection services={services} onToggleService={toggleService} />

        {/* Location Section */}
        <LocationSection
          locations={locations}
          onSelectLocation={selectLocation}
        />

        {/* Date & Time Section */}
        <DateTimeSection
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          onSelectDate={setSelectedDate}
          onSelectTimeSlot={selectTimeSlot}
        />

        {/* Continue Button */}
        <div className="pb-8">
          <Button
            className="w-full h-16 text-xl font-semibold rounded-3xl bg-accent-primary hover:bg-accent-secondary"
            size="lg"
          >
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
}

// Services Section Component
function ServicesSection({
  services,
  onToggleService,
}: {
  services: ServiceOption[];
  onToggleService: (id: string) => void;
}) {
  return (
    <Card className="p-10 lg:p-16 rounded-[40px] bg-background-secondary border-0 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-8 mb-10">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M50.905 38.336C49.3782 41.9467 46.9901 45.1285 43.9495 47.6031C40.9089 50.0777 37.3085 51.7698 33.4629 52.5314C29.6173 53.2931 25.6436 53.1011 21.8894 51.9723C18.1351 50.8435 14.7145 48.8121 11.9267 46.0559C9.13881 43.2997 7.06857 39.9026 5.89694 36.1615C4.72531 32.4203 4.48796 28.4491 5.20565 24.5951C5.92334 20.741 7.57421 17.1215 10.0139 14.0528C12.4536 10.9842 15.6079 8.55993 19.201 6.99197M50.9741 19.8156C51.9349 22.1351 52.5243 24.5872 52.7243 27.082C52.7737 27.6983 52.7984 28.0065 52.676 28.2841C52.5738 28.5159 52.3712 28.7354 52.1483 28.8558C51.8813 29 51.5479 29 50.881 29H30.721C30.049 29 29.7129 29 29.4562 28.8692C29.2304 28.7541 29.0469 28.5706 28.9318 28.3448C28.801 28.0881 28.801 27.752 28.801 27.08V6.91997C28.801 6.25309 28.801 5.91965 28.9452 5.65273C29.0656 5.42976 29.2851 5.22723 29.5169 5.125C29.7945 5.00261 30.1027 5.02732 30.719 5.07673C33.2137 5.27674 35.6659 5.86609 37.9854 6.82686C40.8972 8.03298 43.543 9.8008 45.7716 12.0294C48.0002 14.258 49.768 16.9038 50.9741 19.8156Z"
            stroke="#0047ED"
            strokeWidth="4.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h2 className="flex-1 text-3xl lg:text-4xl font-medium text-content-primary">
          Услуги
        </h2>

        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          className="transform rotate-90"
        >
          <path
            d="M14.8001 36.2003L29.2001 21.8003L43.6001 36.2003"
            stroke="#8E93AD"
            strokeWidth="4.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Service options */}
      <div className="space-y-5">
        {services.map((service, index) => (
          <div key={service.id}>
            {index > 0 && <div className="h-0.5 bg-gray-100 my-5" />}
            <ServiceItem
              service={service}
              onToggle={() => onToggleService(service.id)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

// Individual Service Item
function ServiceItem({
  service,
  onToggle,
}: {
  service: ServiceOption;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl lg:text-4xl font-medium text-content-primary flex-1">
          {service.name}
        </h3>
        <button
          onClick={onToggle}
          className="w-12 h-12 rounded-full flex-shrink-0"
        >
          {service.selected ? (
            <div className="w-11 h-11 bg-accent-primary rounded-full flex items-center justify-center text-white text-2xl">
              ✓
            </div>
          ) : (
            <div className="w-11 h-11 border-2 border-content-tertiary rounded-full" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between text-content-secondary">
        <div className="flex items-center gap-2">
          <svg width="38" height="39" viewBox="0 0 38 39" fill="none">
            <path
              d="M19 35.2331C27.7445 35.2331 34.8333 28.1443 34.8333 19.3997C34.8333 10.6552 27.7445 3.56641 19 3.56641C10.2555 3.56641 3.16663 10.6552 3.16663 19.3997C3.16663 28.1443 10.2555 35.2331 19 35.2331Z"
              stroke="#8E93AD"
              strokeWidth="3.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 9.8999V19.3999L25.3333 22.5666"
              stroke="#8E93AD"
              strokeWidth="3.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl lg:text-3xl">{service.duration}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg width="39" height="39" viewBox="0 0 39 39" fill="none">
            <path
              d="M19.3333 27.3166C19.3333 31.6888 22.8777 35.2332 27.25 35.2332C31.6223 35.2332 35.1667 31.6888 35.1667 27.3166C35.1667 22.9443 31.6223 19.3999 27.25 19.3999C22.8777 19.3999 19.3333 22.9443 19.3333 27.3166ZM19.3333 27.3166C19.3333 25.534 19.9225 23.8891 20.9167 22.5658V8.31657M19.3333 27.3166C19.3333 28.6234 19.65 29.8562 20.2107 30.9426C18.8768 32.0694 15.7959 32.8582 12.2083 32.8582C7.39885 32.8582 3.5 31.4405 3.5 29.6916V8.31657M20.9167 8.31657C20.9167 10.0655 17.0178 11.4832 12.2083 11.4832C7.39885 11.4832 3.5 10.0655 3.5 8.31657M20.9167 8.31657C20.9167 6.56767 17.0178 5.1499 12.2083 5.1499C7.39885 5.1499 3.5 6.56767 3.5 8.31657M3.5 22.5666C3.5 24.3155 7.39885 25.7332 12.2083 25.7332C15.6743 25.7332 18.6673 24.997 20.069 23.9311M20.9167 15.4416C20.9167 17.1905 17.0178 18.6082 12.2083 18.6082C7.39885 18.6082 3.5 17.1905 3.5 15.4416"
              stroke="#8E93AD"
              strokeWidth="3.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl lg:text-3xl">{service.price}</span>
        </div>
      </div>
    </div>
  );
}

// Location Section Component
function LocationSection({
  locations,
  onSelectLocation,
}: {
  locations: LocationOption[];
  onSelectLocation: (id: string) => void;
}) {
  return (
    <Card className="p-10 lg:p-16 rounded-[40px] bg-background-secondary border-0 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-8 mb-10">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <path
            d="M28 30.3334C31.866 30.3334 35 27.1994 35 23.3334C35 19.4674 31.866 16.3334 28 16.3334C24.134 16.3334 21 19.4674 21 23.3334C21 27.1994 24.134 30.3334 28 30.3334Z"
            stroke="#0047ED"
            strokeWidth="4.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 51.3334C37.3334 42.0001 46.6667 33.6427 46.6667 23.3334C46.6667 13.0241 38.3094 4.66675 28 4.66675C17.6907 4.66675 9.33337 13.0241 9.33337 23.3334C9.33337 33.6427 18.6667 42.0001 28 51.3334Z"
            stroke="#0047ED"
            strokeWidth="4.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h2 className="flex-1 text-3xl lg:text-4xl font-medium text-content-primary">
          Локация
        </h2>

        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          className="transform rotate-90"
        >
          <path
            d="M14 35L28 21L42 35"
            stroke="#8E93AD"
            strokeWidth="4.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Location options */}
      <div className="space-y-5">
        {locations.map((location, index) => (
          <div key={location.id}>
            {index > 0 && <div className="h-0.5 bg-gray-100 my-5" />}
            <LocationItem
              location={location}
              onSelect={() => onSelectLocation(location.id)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

// Individual Location Item
function LocationItem({
  location,
  onSelect,
}: {
  location: LocationOption;
  onSelect: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-medium text-content-primary flex-1">
          {location.name}
        </h3>
        <button
          onClick={onSelect}
          className="w-12 h-12 rounded-full flex-shrink-0"
        >
          {location.selected ? (
            <div className="w-11 h-11 bg-accent-primary rounded-full flex items-center justify-center text-white text-2xl">
              ✓
            </div>
          ) : (
            <div className="w-11 h-11 border-2 border-content-tertiary rounded-full" />
          )}
        </button>
      </div>

      <div className="text-content-secondary text-2xl">{location.address}</div>
    </div>
  );
}

// Date & Time Section Component
function DateTimeSection({
  selectedDate,
  timeSlots,
  onSelectDate,
  onSelectTimeSlot,
}: {
  selectedDate: number;
  timeSlots: TimeSlot[];
  onSelectDate: (date: number) => void;
  onSelectTimeSlot: (id: string) => void;
}) {
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const dates = [31, 1, 2, 3, 4, 5, 6];

  return (
    <Card className="p-15 rounded-3xl bg-background-secondary border-0 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-8 mb-8">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <path
            d="M28 13.9998V27.9998L37.3333 32.6665M51.3333 27.9998C51.3333 40.8865 40.8866 51.3332 28 51.3332C15.1133 51.3332 4.66663 40.8865 4.66663 27.9998C4.66663 15.1132 15.1133 4.6665 28 4.6665C40.8866 4.6665 51.3333 15.1132 51.3333 27.9998Z"
            stroke="#0047ED"
            strokeWidth="4.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h2 className="flex-1 text-3xl lg:text-4xl font-medium text-content-primary">
          Дата и время
        </h2>

        <svg
          width="57"
          height="56"
          viewBox="0 0 57 56"
          fill="none"
          className="transform rotate-90"
        >
          <path
            d="M14.1999 35L28.2 21L42.2 35"
            stroke="#8E93AD"
            strokeWidth="4.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="h-0.5 bg-gray-300 mb-8" />

      {/* Calendar */}
      <div className="bg-white rounded-3xl p-10 mb-8">
        {/* Month header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl lg:text-4xl font-medium text-content-primary">
            Декабрь 2024
          </h3>
          <div className="flex items-center gap-4">
            <button className="text-accent-primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="text-accent-primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Days of week and dates */}
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-content-secondary text-xl mb-4">{day}</div>
              <button
                onClick={() => onSelectDate(dates[index])}
                className={`w-16 h-16 rounded-full text-4xl font-medium transition-colors ${
                  selectedDate === dates[index]
                    ? "bg-accent-primary text-white"
                    : "text-content-primary hover:bg-gray-100"
                }`}
              >
                {dates[index]}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="h-0.5 bg-gray-300 mb-8" />

      {/* Time slots */}
      <div className="space-y-6">
        {Array.from({ length: 4 }, (_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {timeSlots.slice(rowIndex * 4, (rowIndex + 1) * 4).map((slot) => (
              <button
                key={slot.id}
                onClick={() => onSelectTimeSlot(slot.id)}
                disabled={!slot.available}
                className={`px-8 py-4 rounded-3xl text-2xl font-medium transition-colors ${
                  slot.selected
                    ? "bg-accent-primary text-white"
                    : slot.available
                      ? "bg-white border border-gray-200 text-content-secondary hover:bg-gray-50"
                      : "bg-white border border-gray-200 text-content-secondary opacity-50 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
